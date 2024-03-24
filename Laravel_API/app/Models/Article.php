<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'body',
        'slug',
        'user_id', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    
    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorites', 'article_id', 'user_id');
    }

}
