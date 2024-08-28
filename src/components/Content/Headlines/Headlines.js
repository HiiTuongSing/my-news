import axios from "axios";
import NewsCard from "../NewsCard/NewsCard";
import NewsCardLarge from "../NewsCardLarge/NewsCardLarge";
import { useState } from "react";

function Headlines() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const test = () => {
    setArticles(fetchHeadlines());
  };

  const fetchHeadlines = async () => {
    setIsLoading(true);
    const response = await axios.get(
      "https://newsapi.org/v2/everything?q=malaysia&pageSize=4&page=1&sortBy=publishedAt&apiKey=0b3d3b7a151b4952b93507d2b9a71bde"
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
    <fieldset className="border-2 p-2">
      <legend>Headlines</legend>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick={() => test()}
      >
        Test Load
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        <div className="sm:col-span-3">
          <NewsCardLarge />
        </div>
        {isLoading && <h1 className="animate-pulse">Loading ...</h1>}
        <div className="sm:col-span-2 grid grid-cols-2 gap-2">
          {articles.length > 0 &&
            articles.map((article, index) => {
              return <NewsCard key={index} article={article} />;
            })}
        </div>
      </div>
    </fieldset>
  );
}

export default Headlines;
