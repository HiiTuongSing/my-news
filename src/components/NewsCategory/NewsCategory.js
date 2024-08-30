import Loading from "../Loading/Loading";
import NewsCard from "../NewsCard/NewsCard";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/utils";
import { useFetchNews } from "../../hooks/hooks";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function NewsCategory({ category }) {
  // let url = `https://newsapi.org/v2/everything?q=${category}&pageSize=4&page=1&sortBy=relativity&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`;
  let url = "/testapi4.json";
  const { articles, isLoading, error } = useFetchNews(url);

  return (
    <fieldset className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-2 p-2 border-2 p-2 border-blue-500 relative">
      <legend className="flex w-full justify-between">
        <h1 className="text-xl font-bold px-4 text-blue-500">
          {capitalizeFirstLetter(category)}
        </h1>
        {isLoading && <Loading />}
        {error && <ErrorMessage error={error} />}
        <Link
          to={`/category/${category}`}
          className="text-sm font-bold mx-4 px-2 bg-blue-500 hover:bg-blue-700 py-1 rounded text-white"
        >
          Show more
        </Link>
      </legend>
      {articles.length > 0 &&
        articles.map((article, index) => {
          return <NewsCard key={index} article={article} />;
        })}
    </fieldset>
  );
}

export default NewsCategory;
