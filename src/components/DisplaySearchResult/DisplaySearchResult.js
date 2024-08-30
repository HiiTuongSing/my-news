import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../NewsCard/NewsCard";

export default function DisplaySearchResult() {
  const today = new Date().toISOString().split("T")[0];
  const keywords = useParams();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState({
    category: keywords.id,
    dateStart: today,
    dateEnd: today,
    source: "",
  });

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

  const handleFilter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${
          filter.category === "" ? keywords.id : filter.category
        }&from=${filter.dateStart}&to=${filter.dateEnd}${
          filter.source
        }&pageSize=16&page=${page}&sortBy=relativity&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`
      );
      setIsLoading(false);
      setArticles(response.data.articles);
      if (!response.data.length > 0)
        alert("No results found, try changing the filter.");
    } catch (err) {
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
      <div>
        <form onSubmit={(e) => handleFilter(e)}>
          <label>Category</label>
          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
          </select>
          <label>Date Range</label>
          <input
            type="date"
            value={filter.dateStart}
            onChange={(e) =>
              setFilter({ ...filter, dateStart: e.target.value })
            }
          />
          <input
            type="date"
            value={filter.dateEnd}
            onChange={(e) => setFilter({ ...filter, dateEnd: e.target.value })}
          />
          <label>Source</label>
          <select
            value={filter.source}
            onChange={(e) => setFilter({ ...filter, source: e.target.value })}
          >
            <option value="">Select Source</option>
            <option value="&domains=thestar.com.my">The Star</option>
            <option value="&domains=techcrunch.com">Tech Crunch</option>
            <option value="&domains=thenextweb.com">The Next Web</option>
            <option value="&domains=nst.com.my">New Straits Times</option>
            <option value="&domains=theedgemarkets.com">
              The Edge Markets
            </option>
          </select>
          <button type="submit">Apply Filters</button>
        </form>
      </div>
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
    </div>
  );
}
