import { useState } from "react";
import axios from "axios";
import NewsCard from "../NewsCard/NewsCard";
import { Link } from "react-router-dom";

function NewsCategory({ category }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const test = () => {
    fetchByCategory(category);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchByCategory = async (category) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${category}&pageSize=4&page=1&sortBy=relativity&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`
      );
      setIsLoading(false);
      setArticles(response.data.articles);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  // useState(() => {
  //   fetchByCategory(category);
  // }, []);

  return (
    <fieldset className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-2 p-2 border-2 p-2 border-blue-500">
      <legend className="flex w-full justify-between">
        <h1 className="text-xl font-bold px-4 text-blue-500">
          {capitalizeFirstLetter(category)}
        </h1>
        <button onClick={() => test()}>Load</button>
        {isLoading && <h1 className="animate-pulse">Loading ...</h1>}
        <div className="sm:col-span-4 col-span-2 flex w-full justify-center">
          <Link
            to={`/category/${category}`}
            className="text-sm font-bold mx-4 px-2 bg-blue-500 hover:bg-blue-700 py-1 rounded text-white"
          >
            Show more
          </Link>
        </div>
      </legend>
      {articles.length > 0 &&
        articles.map((article, index) => {
          return <NewsCard key={index} article={article} />;
        })}
    </fieldset>
  );
}

export default NewsCategory;
