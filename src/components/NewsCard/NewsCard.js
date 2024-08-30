function NewsCard({ article }) {
  return (
    <a href={article.url}>
      <div className="relative bg-slate-100 h-full text-blue-700 hover:bg-slate-200 hover:text-blue-900">
        <h3 className="bg-white/75 w-full absolute left-0 top-0 text-xs p-1">
          {article.source.name}
        </h3>
        <img
          src={article.urlToImage}
          alt="News Thumbnail"
          className="aspect-video"
        />
        <h3 className="limit-lines p-1 text-sm">{article.title}</h3>
      </div>
    </a>
  );
}
export default NewsCard;
