"use client";

import React, { useState, useEffect } from "react";

import { useParams } from "next/navigation";

export default function EditPage() {
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState([]);
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    const { slug } = params;
    const API_URL = process.env.NEXT_PUBLIC_API_URL + `/articles/${slug}`;

    console.log(API_URL);

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(articleData),
      });
      const responseData = await response.json();
      console.log(responseData.user_id);

      if (!response.ok) {
        console.log(response.body);
        throw new Error("Article submission failed");
      }

      const result = responseData;
      console.log("Article submitted successfully:", result);
      window.location.href = "/home";
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      const { slug } = params;
      try {
        const response = await fetch(
          `http://localhost:8000/api/articles/${slug}`
        );
        if (!response.ok) throw new Error("Article not found");
        const data = await response.json();
        setArticle(data.article);
        setDescription(data.article.description);
        setBody(data.article.body);
        setTagList(data.article.tagList || []);
        setTitle(data.article.title);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, [params.slug]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    value={tagList}
                    onChange={(e) => setTagList(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
