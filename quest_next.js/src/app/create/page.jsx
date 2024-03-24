import ArticleForm from "../components/ArticleForm";

export default function CreateArticlePage() {
  // 記事作成のロジックをここに実装
  /*const handleSubmit = (event) => {
    event.preventDefault();
    // フォームデータを使用して記事を作成
  };*/

  return (
    <div className="editor-page">
      <ArticleForm //onSubmit={handleSubmit}
      />
    </div>
  );
}
