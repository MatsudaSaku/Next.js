"use client";

import React, { useState, useEffect } from "react";
// Next.jsを使用している場合、useRouterフックをインポートします。
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const [article, setArticle] = useState(null);
  const params = useParams();
  //const slug = router.query ? router.query.slug : null;

  useEffect(() => {
    // APIから記事データをフェッチする関数
    const fetchArticle = async () => {
      const { slug } = params;
      try {
        const response = await fetch(
          `http://localhost:8000/api/articles/${slug}`
        );
        if (!response.ok) throw new Error("Article not found");
        const data = await response.json();
        setArticle(data.article); // 取得した記事データを状態にセット
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, [params.slug]); // slugが変更された時に再フェッチ

  if (!article) return <div>Loading...</div>; // 記事データがまだない場合はローディング表示

  return (
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{article.title}</h1>

          <div class="article-meta">
            <a href="/profile/eric-simons">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div class="info">
              <a href="/profile/eric-simons" class="author">
                {article.author.username}
              </a>
              <span class="date">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {article.author.username}{" "}
              <span class="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post{" "}
              <span class="counter">{article.favoritesCount}</span>
            </button>
            <button class="btn btn-sm btn-outline-secondary">
              <a href={`/edit/${article.slug}`}>
                <i class="ion-edit"></i> Edit Article
              </a>
            </button>
            <button class="btn btn-sm btn-outline-danger">
              <i class="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">
            <p>{article.description}</p>
            <h2 id="introducing-ionic">{article.title}</h2>
            <p>{article.body}</p>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline">realworld</li>
              <li class="tag-default tag-pill tag-outline">implementations</li>
            </ul>
          </div>
        </div>

        <hr />

        <div class="article-actions">
          <div class="article-meta">
            <a href="profile.html">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div class="info">
              <a href="" class="author">
                {article.author.username}
              </a>
              <span class="date">
                {" "}
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {article.author.username}
            </button>
            &nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Article <span class="counter">(29)</span>
            </button>
            <button class="btn btn-sm btn-outline-secondary">
              <a href={`/edit/${article.slug}`}>
                <i class="ion-edit"></i> Edit Article
              </a>
            </button>
            <button class="btn btn-sm btn-outline-danger">
              <i class="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <form class="card comment-form">
              <div class="card-block">
                <textarea
                  class="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                ></textarea>
              </div>
              <div class="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
                <button class="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div class="card">
              <div class="card-block">
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div class="card-footer">
                <a href="/profile/author" class="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    class="comment-author-img"
                  />
                </a>
                &nbsp;
                <a href="/profile/jacob-schmidt" class="comment-author">
                  Jacob Schmidt
                </a>
                <span class="date-posted">Dec 29th</span>
              </div>
            </div>

            <div class="card">
              <div class="card-block">
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div class="card-footer">
                <a href="/profile/author" class="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    class="comment-author-img"
                  />
                </a>
                &nbsp;
                <a href="/profile/jacob-schmidt" class="comment-author">
                  Jacob Schmidt
                </a>
                <span class="date-posted">Dec 29th</span>
                <span class="mod-options">
                  <i class="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
