import axios from "axios";
import { useState } from "react";
import NewsCard from "./NewsCard/NewsCard";

function Content() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const test = () => {
    setArticles(fetchHeadlines());
  };

  const fetchHeadlines = async () => {
    setIsLoading(true);
    const response = await axios.get(
      "https://newsapi.org/v2/everything?q=malaysia&pageSize=16&page=1&sortBy=publishedAt&apiKey=0b3d3b7a151b4952b93507d2b9a71bde"
    );
    setIsLoading(false);
    try {
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(articles);

  return (
    <div className="w-[100vw]">
      <div className="w-[80%] min-h-[90vh] border-2 border-black m-auto">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => test()}
        >
          Test Load
        </button>
        {isLoading && <h1 className="animate-pulse">Loading ...</h1>}
        <div className="grid grid-cols-4 gap-2">
          {articles.length > 0 &&
            articles.map((article, index) => {
              return <NewsCard key={index} article={article} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Content;
