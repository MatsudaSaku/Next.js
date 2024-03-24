<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Article;

class ArticleApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

   

    public function test_fetch_single_article()
    {
        $article = Article::factory()->create();

        $response = $this->getJson("/api/articles/{$article->slug}");

        $response->assertStatus(200);

        $response->assertJson([
            'article' => [
                'slug' => $article->slug,
                'title' => $article->title,
                'description' => $article->description,
                'body' => $article->body,
                'tagList' => [],
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
}
