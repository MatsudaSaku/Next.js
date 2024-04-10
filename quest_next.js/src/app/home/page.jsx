"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchArticles } from "../api/articleAPI";

export default function Home() {
  const [articles, setArticles] = useState([]);

  /*useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("http://localhost:8000/api/home"); // LaravelプロジェクトのAPIエンドポイント
      const data = await res.json();
      setArticles(data);
    }
    fetchArticles();
  }, []);*/

  useEffect(() => {
    //fetch("http://localhost:8000/api/home")
    fetch(process.env.NEXT_PUBLIC_API_URL + "/home")
      //fetchArticles()
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>
            {articles.map((article) => (
              <div className="article-preview" key={article.id}>
                <div className="article-meta">
                  <a href="/profile/eric-simons">
                    <Image
                      src="http://i.imgur.com/Qr71crq.jpg"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </a>
                  <div className="info">
                    <a
                      href={`/profile/${article.author.username}`}
                      className="author"
                    >
                      {article.author.username}
                    </a>
                    <span className="date">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {article.favoritesCount}
                  </button>
                </div>
                <a href={`/article/${article.slug}`} className="preview-link">
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                    {article.tags &&
                      article.tags.map((tag) => (
                        <li
                          key={tag.id}
                          className="tag-default tag-pill tag-outline"
                        >
                          {tag.name}
                        </li>
                      ))}
                    <li className="tag-default tag-pill tag-outline">
                      realworld
                    </li>
                    <li className="tag-default tag-pill tag-outline">
                      implementations
                    </li>
                  </ul>
                </a>
              </div>
            ))}

            <ul className="pagination">
              <li className="page-item active">
                <a className="page-link" href="">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="">
                  2
                </a>
              </li>
            </ul>
          </div>
          {articles.map((article) => (
            <div className="taglist" key={article.id}>
              {article.tagList.map((tag, index) => (
                <a href="" className="tag-pill tag-default" key={index}>
                  {tag}
                </a>
              ))}
            </div>
          ))}

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">
                  programming
                </a>
                <a href="" className="tag-pill tag-default">
                  javascript
                </a>
                <a href="" className="tag-pill tag-default">
                  emberjs
                </a>
                <a href="" className="tag-pill tag-default">
                  angularjs
                </a>
                <a href="" className="tag-pill tag-default">
                  react
                </a>
                <a href="" className="tag-pill tag-default">
                  mean
                </a>
                <a href="" className="tag-pill tag-default">
                  node
                </a>
                <a href="" className="tag-pill tag-default">
                  rails
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
