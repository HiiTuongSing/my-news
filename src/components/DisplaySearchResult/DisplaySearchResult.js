import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { useFetchNews } from "../../hooks/hooks";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function DisplaySearchResult() {
  const keywords = useParams();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(keywords.id);
  const [source, setSource] = useState(null);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [currentPage, setCurrentPage] = useState([]);
  const defaultFilter = {
    category: keywords.id,
    dateStart: null,
    dateEnd: null,
    source: null,
  };
  const [filter, setFilter] = useState(defaultFilter);
  // let url = `https://newsapi.org/v2/everything?q=${category}&pageSize=16&page=${page}&sortBy=relativity&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`;
  // if (dateStart) url += dateStart;
  // if (dateEnd) url += dateEnd;
  // if (source) url += source;
  let url = "/testapi16.json";
  const { articles, isLoading, error } = useFetchNews(url);

  const handleFilter = (e) => {
    e.preventDefault();
    setCategory(filter.category);
    if (filter.dateStart) setDateStart(`&from=${filter.dateStart}`);
    if (filter.dateEnd) setDateEnd(`&to=${filter.dateEnd}`);
    if (filter.source) setSource(`&domains=${filter.source}`);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const resetFilter = () => {
    setCategory(keywords.id);
    setDateStart(null);
    setDateEnd(null);
    setSource(null);
    setFilter(defaultFilter);
  };

  useEffect(() => {
    setCategory(keywords.id);
  }, [keywords.id]);

  useEffect(() => {
    if (page === 1) {
      setCurrentPage(articles);
    } else {
      setCurrentPage((previousPage) => [...previousPage, ...articles]);
    }
  }, [articles, page]);

  return (
    <div className="w-[90%] m-auto py-10 min-h-[90vh]">
      <div className="bg-slate-100 p-6 rounded-lg shadow-md mb-8 text-blue-500">
        <form onSubmit={(e) => handleFilter(e)} className="space-y-6">
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
              <option value={keywords.id}>Select Category</option>
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
                  value={filter.dateStart ? filter.dateStart : ""}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      dateStart: e.target.value,
                    })
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
                  value={filter.dateEnd ? filter.dateEnd : ""}
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
              value={filter.source ? filter.source : ""}
              onChange={(e) => setFilter({ ...filter, source: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Source</option>
              <option value="thestar.com.my">The Star</option>
              <option value="techcrunch.com">Tech Crunch</option>
              <option value="thenextweb.com">The Next Web</option>
              <option value="nst.com.my">New Straits Times</option>
              <option value="theedgemarkets.com">The Edge Markets</option>
            </select>
          </fieldset>

          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={() => resetFilter()}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-medium text-sm sm:text-md py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
            >
              Reset Filters
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm sm:text-md py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      <fieldset className="border-2 p-2 border-2 p-4 border-blue-500 w-full relative">
        <legend className="text-xl text-blue-500 px-4">
          Showing Results for{" "}
          <span className="text-blue-700 font-bold">{category}</span>
          {isLoading && <Loading />}
          {error && <ErrorMessage error={error} />}
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentPage.length > 0 &&
            currentPage.map((article, index) => {
              return <NewsCard key={index} article={article} />;
            })}
        </div>
        {articles.length > 16 && (
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
