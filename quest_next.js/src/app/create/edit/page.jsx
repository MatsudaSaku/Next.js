"use client";

import { useState } from "react";
import axios from "axios";

export default function ArticleForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState([]);

  // タグの追加や削除など、タグリストの管理に関するロジックは省略

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_API_URL);

    const articleData = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    const API_URL = process.env.NEXT_PUBLIC_API_URL + "/articles";
    /*try {
      //const API_URL = "http://localhost:8000/api/articles";
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, articleData, {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${token}`,
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Article submitted successfully:", response.data);
      window.location.href = "/home";
    } catch (error) {
      console.error(
        "Error submitting article:",
        error.response ? error.response.data : error.message
      );
    }*/
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // サーバーで認証が必要な場合
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        console.log(response.body);
        throw new Error("Article submission failed");
      }

      const result = await response.json();
      console.log("Article submitted successfully:", result);
      window.location.href = "/home";
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

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
                    placeholder="Article Title"
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
