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
    <div className="w-[90%] m-auto py-10 min-h-[90vh]">
      <div className="bg-slate-100 p-6 rounded-lg shadow-md mb-8 text-blue-500">
        <form onSubmit={(e) => handleFilter(e)} className="space-y-6">
          {/* Category */}
          <fieldset className="border-t border-gray-200 pt-4">
            <legend className="text-base font-medium text-blue-700">
              Category
            </legend>
            <select
              id="category"
              value={filter.category}
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Category</option>
              <option value="technology">Technology</option>
              <option value="science">Science</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
            </select>
          </fieldset>

          {/* Date Range */}
          <fieldset className="border-t border-gray-200 pt-4">
            <legend className="text-base font-medium text-blue-700">
              Date Range
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <label
                  htmlFor="dateStart"
                  className="block text-sm font-medium text-blue-700"
                >
                  From
                </label>
                <input
                  type="date"
                  id="dateStart"
                  value={filter.dateStart}
                  onChange={(e) =>
                    setFilter({ ...filter, dateStart: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="dateEnd"
                  className="block text-sm font-medium text-blue-700"
                >
                  To
                </label>
                <input
                  type="date"
                  id="dateEnd"
                  value={filter.dateEnd}
                  onChange={(e) =>
                    setFilter({ ...filter, dateEnd: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </fieldset>

          {/* Source */}
          <fieldset className="border-t border-gray-200 pt-4">
            <legend className="text-base font-medium text-blue-700">
              Source
            </legend>
            <select
              id="source"
              value={filter.source}
              onChange={(e) => setFilter({ ...filter, source: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          </fieldset>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      <fieldset className="border-2 p-2 border-2 p-4 border-blue-500 w-full">
        <legend className="text-xl text-blue-500 px-4">
          Showing Results for{" "}
          <span className="text-blue-700 font-bold">{keywords.id}</span>
          <button onClick={() => test()}>Load</button>
          {isLoading && <h1 className="animate-pulse">Loading ...</h1>}
        </legend>
        <div className="grid grid-cols-4 gap-2">
          {articles.length > 0 &&
            articles.map((article, index) => {
              return <NewsCard key={index} article={article} />;
            })}
        </div>
        {articles.length > 0 && (
          <div className="col-span-2 sm:col-span-4 w-full flex justify-center my-4">
            <button
              className="border-2 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white"
              onClick={() => handleLoadMore()}
            >
              Load more...
            </button>
          </div>
        )}
      </fieldset>
    </div>
  );
}
