// pages/edit/page.jsx
import ArticleForm from "../../components/ArticleForm";

export default function EditArticlePage() {
  // 編集する記事の初期データをロードするロジック
  //const initialData = {/* 記事データ */};

  /*const handleSubmit = (event) => {
    event.preventDefault();
    // フォームデータを使用して記事を更新
  };*/

  return (
    <div className="editor-page">
      <ArticleForm //onSubmit={handleSubmit} initialData={initialData}
      />
    </div>
  );
}
