function NewsCardLarge({ article }) {
  return (
    <a href={article.url} target="_blank">
      <div className="w-full relative text-blue-700 hover:text-blue-900">
        <img src={article.urlToImage} alt="headline news" className="w-full" />
        <div className="absolute bottom-0 bg-white/75 p-2">
          <h1>{article.source.name}</h1>
          <p className="font-bold limit-lines">{article.description}</p>
        </div>
      </div>
    </a>
  );
}

export default NewsCardLarge;
