import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../NewsCard/NewsCard";
import { useParams } from "react-router-dom";

function MoreNews() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const category = useParams();

  const test = () => {
    setPage(1);
    fetchByCategory(category, page);
  };

  const fetchByCategory = async (category, page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${category.id}&pageSize=16&page=${page}&sortBy=relativity&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`
      );
      setIsLoading(false);
      setArticles(response.data.articles);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const loadMore = async (category, page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${category.id}&pageSize=16&page=${page}&sortBy=relativity&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`
      );
      setIsLoading(false);
      setArticles((prev) => [...prev, ...response.data.articles]);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore(category, page);
  }, [page]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // useEffect(() => {
  //   setPage(1);
  //   setArticles([]);
  //   fetchByCategory(category);
  // }, [category]);

  return (
    <fieldset className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-2 p-2 border-2 p-2 border-blue-500 w-full">
      <legend className="flex w-full justify-between text-xl font-bold px-4 text-blue-500">
        Category: {capitalizeFirstLetter(category.id)}
        {/* <button onClick={() => test()}>Load</button> */}
      </legend>
      {isLoading && <h1 className="animate-pulse">Loading ...</h1>}
      {articles.length > 0 &&
        articles.map((article, index) => {
          return <NewsCard key={index} article={article} />;
        })}
      {articles.length > 0 && (
        <div className="flex w-full justify-center sm:col-span-4 col-span-2">
          <button
            type="button"
            className="border-2 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white"
            onClick={() => handleLoadMore()}
          >
            Load more...
          </button>
        </div>
      )}
    </fieldset>
  );
}

export default MoreNews;
