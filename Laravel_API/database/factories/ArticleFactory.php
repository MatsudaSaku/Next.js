<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'body' => $this->faker->text,
            'slug' => $this->faker->slug,
            'user_id' => \App\Models\User::factory(),
        ];
    }
}

