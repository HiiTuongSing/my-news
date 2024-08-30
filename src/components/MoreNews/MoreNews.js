import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/utils";
import { useFetchNews } from "../../hooks/hooks";
import NewsCard from "../NewsCard/NewsCard";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function MoreNews() {
  const category = useParams();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState([]);
  // let url = `https://newsapi.org/v2/everything?q=${category.id}&pageSize=16&page=${page}&sortBy=relativity&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`;
  let url = "/testapi16.json";
  const { articles, isLoading, error } = useFetchNews(url);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (page === 1) {
      setCurrentPage(articles);
    } else {
      setCurrentPage((previousPage) => [...previousPage, ...articles]);
    }
  }, [articles, page]);

  return (
    <fieldset className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-2 p-2 border-2 p-2 border-blue-500 w-full relative">
      <legend className="flex w-full justify-between text-xl font-bold px-4 text-blue-500">
        More about {capitalizeFirstLetter(category.id)}:
      </legend>
      {isLoading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {currentPage.length > 0 &&
        currentPage.map((article, index) => {
          return <NewsCard key={index} article={article} />;
        })}
      {currentPage.length > 16 && (
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
