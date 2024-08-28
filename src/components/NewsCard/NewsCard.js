function NewsCard({ article }) {
  return (
    <a href={article.url}>
      <div>
        <h3>{article.source.name}</h3>

        <img
          src={article.urlToImage}
          alt="News Thumbnail"
          className="aspect-video"
        />
        <h3>
          {article.title} - {article.publishedAt.split("T")[0]}
        </h3>
      </div>
    </a>
  );
}
export default NewsCard;
