export default function ArticleForm({ onSubmit, initialData }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Article Title"
            defaultValue={initialData?.title}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="What's this article about?"
            defaultValue={initialData?.description}
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            className="form-control"
            rows="8"
            placeholder="Write your article (in markdown)"
            defaultValue={initialData?.body}
          ></textarea>
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter tags"
            defaultValue={initialData?.tags?.join(", ")}
          />
        </fieldset>
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
          Publish Article
        </button>
      </fieldset>
    </form>
  );
}
