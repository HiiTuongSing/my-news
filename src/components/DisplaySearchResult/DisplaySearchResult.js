import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../NewsCard/NewsCard";

export default function DisplaySearchResult() {
  const keywords = useParams();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const fetchByCategory = async (keywords, page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${keywords.id}&pageSize=16&page=${page}&sortBy=relativity&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`
      );
      setIsLoading(false);
      setArticles(response.data.articles);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const test = () => {
    fetchByCategory(keywords, page);
  };

  const loadMore = async (keywords, page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${keywords.id}&pageSize=16&page=${page}&sortBy=relativity&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`
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
    loadMore(keywords, page);
  }, [page]);

  // useEffect(() => {
  //   setArticles([]);
  //   setPage(1);
  //   fetchByCategory(keywords, page);
  // }, [keywords]);

  return (
    <div className="w-[90%] m-auto">
      <h1>Showing Results for {keywords.id}</h1>
      <button onClick={() => test()}>Load</button>
      {isLoading && <h1 className="animate-pulse">Loading ...</h1>}
      <div className="grid grid-cols-5 gap-2">
        {articles.length > 0 &&
          articles.map((article, index) => {
            return <NewsCard key={index} article={article} />;
          })}
      </div>
      <button onClick={() => handleLoadMore()}>Load more...</button>
      <div>
        <form>
          <label>Category</label>
          <select>
            <option>Technology</option>
            <option>Science</option>
            <option>Business</option>
            <option>Health</option>
          </select>
          <label>Date Range</label>
          <input type="date" />
          <input type="date" />
          <label>Source</label>
          <select>
            <option>The Star</option>
          </select>
        </form>
      </div>
    </div>
  );
}
