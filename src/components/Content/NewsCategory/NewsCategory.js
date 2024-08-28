import { useState } from "react";
import axios from "axios";
import NewsCard from "../NewsCard/NewsCard";

function NewsCategory() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const test = () => {
    fetchByCategory();
  };

  const fetchByCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=malaysia&pageSize=4&page=1&sortBy=publishedAt&apiKey=0b3d3b7a151b4952b93507d2b9a71bde"
      );
      setIsLoading(false);
      setArticles(response.data.articles);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <fieldset className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-2 p-2">
      <legend className="flex w-full justify-between">
        <h1>Category</h1>
        <button onClick={() => test()}>Load</button>
        {isLoading && <h1 className="animate-pulse">Loading ...</h1>}
        <button>Show more</button>
      </legend>
      {articles.length > 0 &&
        articles.map((article, index) => {
          return <NewsCard key={index} article={article} />;
        })}
    </fieldset>
  );
}

export default NewsCategory;
