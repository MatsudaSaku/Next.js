<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Favorite;
use App\Models\Tag;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index()
    {
        //$articles = Article::with('tags', 'user')->get();
        //return response()->json(['articles' => $articles]);
        $articles = Article::with('user')->get();

       if (!$articles) {
        return response()->json(['message' => 'Article not found'], 404);
    }

    return response()->json([
        'articles' => $articles->map(function ($article) {
            return [
            'slug' => $article->slug,
            'title' => $article->title,
            'description' => $article->description,
            'body' => $article->body,
            'tagList' => $article->tags->pluck('name'),
            'createdAt' => $article->created_at->format('Y-m-d\TH:i:s.vP'),
            'updatedAt' => $article->updated_at->format('Y-m-d\TH:i:s.vP'),
            'favorited' => false,
            'favoritesCount' => 0,
            'author' => [
                'username' => $article->author->username,
                'bio' => $article->author->bio,
                'image' => $article->author->image,
                'following' => false,
            ]
            ];
        })
    ]);
    }

    public function store(Request $request)
    {
        /*$user_id = auth()->id();
        return response()->json([
            $request->all(),
            //'user_id'=>$user_id,
        ]);*/
        //dd($request->all());

        //$data = $request->input('article');
        $data = $request->validate([
            'article.title' => 'required|string',
            'article.description' => 'required|string',
            'article.body' => 'required|string',
            'article.tagList' => 'sometimes|array',
        ])['article'];

    $slug = Str::slug($data['title'], '-');
    $user_id = auth()->id();

    $article = new Article([
        'title' => $data['title'],
        'description' => $data['description'],
        'body' => $data['body'],
        'slug' => $slug,
        'user_id' => $user_id,
    ]);

    if($article->save()){
        return response()->json([
            'message' => 'Article saved successfully',
            'article' => $article
        ]);

    }
    if (isset($data['tagList'])) {
        $tagIds = [];
        foreach ($data['tagList'] as $tagName) {

            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $tagIds[] = $tag->id;
        }

        $article->tags()->sync($tagIds);
    }

        /*return response()->json([
            'article' => [
                'slug' => $article->slug,
                'title' => $article->title,
                'description' => $article->description,
                'body' => $article->body,
                'tagList' => $article->tags->pluck('name'),
                'createdAt' => $article->created_at->format('Y-m-d\TH:i:s.vP'),
                'updatedAt' => $article->updated_at->format('Y-m-d\TH:i:s.vP'),
                'favorited' => false,
                'favoritesCount' => 0,
                'author' => [
                    'username' => $article->user->username,
                    'bio' => $article->user->bio,
                    'image' => $article->user->image,
                    'following' => false,
                ]
            ]
        ]);*/
    }

    public function show($slug)
    {
        $article = Article::where('slug', $slug)->with(['author', 'tags'])->first();

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        return response()->json([
            'article' => [
                'slug' => $article->slug,
                'title' => $article->title,
                'description' => $article->description,
                'body' => $article->body,
                'tagList' => $article->tags->pluck('name'),
                'createdAt' => $article->created_at->format('Y-m-d\TH:i:s.vP'),
                'updatedAt' => $article->updated_at->format('Y-m-d\TH:i:s.vP'),
                'favorited' => false,
                'favoritesCount' => 0,
                'author' => [
                    'username' => $article->author->username,
                    'bio' => $article->author->bio,
                    'image' => $article->author->image,
                    'following' => false,
                ]
            ]
        ]);
    }

    public function update(Request $request, $slug)
    {
        $article = Article::where('slug', $slug)->with(['tags', 'author'])->first();

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        $data = $request->validate([
            'article.title' => 'sometimes|string',
            'article.description' => 'sometimes|string',
            'article.body' => 'sometimes|string',
        ])['article'];

        if (isset($data['title'])) {
            $article->title = $data['title'];

            $article->slug = Str::slug($data['title']);
        }

        if (isset($data['description'])) {
            $article->description = $data['description'];
        }

        if (isset($data['body'])) {
            $article->body = $data['body'];
        }

        $article->save();

        return response()->json([
            'article' => [
                'slug' => $article->slug,
                'title' => $article->title,
                'description' => $article->description,
                'body' => $article->body,
                'tagList' => $article->tags->pluck('name'),
                'createdAt' => $article->created_at->format('Y-m-d\TH:i:s.vP'),
                'updatedAt' => $article->updated_at->format('Y-m-d\TH:i:s.vP'),
                'favorited' => false,
                'favoritesCount' => 0,
                'author' => [
                    'username' => $article->author->username,
                    'bio' => $article->author->bio,
                    'image' => $article->author->image,
                    'following' => false,
                ]
            ]
        ]);

    }

    public function delete($slug)
    {
        $user = Auth::user();

        $article = Article::where('slug', $slug)->first();

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        if($article->user_id !== $user->id){
            return response()->json(['message' => 'Unauthorized', 403]);
        }

        $article->delete();

        return response()->json(['message' => 'Article deleted successfully']);

    }

        public function favorite($slug)
    {
        $user = Auth::user();
        $article = Article::where('slug', $slug)->first();

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        $isFavorited = Favorite::where('user_id', $user->id)
->where('article_id', $article->id)
->exists();

        if ($isFavorited) {
            return response()->json(['message' => 'Article is already favorited'], 409);
        }

        Favorite::create([
            'user_id' => $user->id,
            'article_id' => $article->id,
        ]);

        return response()->json(['article' => $article]);
    }
}
