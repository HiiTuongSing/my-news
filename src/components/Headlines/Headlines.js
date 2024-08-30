import { useParams } from "react-router-dom";
import { useFetchNews } from "../../hooks/hooks";
import { capitalizeFirstLetter } from "../../utils/utils";
import NewsCard from "../NewsCard/NewsCard";
import NewsCardLarge from "../NewsCardLarge/NewsCardLarge";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Headlines() {
  let category = useParams();
  if (!category.id) category.id = "malaysia";
  // let url =  `https://newsapi.org/v2/everything?q=${category.id}&pageSize=5&page=1&sortBy=publishedAt&apiKey=0b3d3b7a151b4952b93507d2b9a71bde`
  let url = "/testapi5.json";

  const { articles, isLoading, error } = useFetchNews(url);

  return (
    <fieldset className="border-2 p-2 border-blue-500 h-[425px] relative">
      {isLoading && <Loading />}
      {error && <ErrorMessage error={error} />}
      <legend className="text-3xl font-bold px-4 text-blue-500">
        {category.id ? capitalizeFirstLetter(category.id) + " " : ""}Headlines
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 p-4">
        <div className="sm:col-span-3">
          {articles.length > 0 && <NewsCardLarge article={articles[0]} />}
        </div>
        <div className="sm:col-span-2 grid grid-cols-2 grid-rows-2 gap-2">
          {articles.length > 0 &&
            articles
              .slice(1)
              .map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
        </div>
      </div>
    </fieldset>
  );
}

export default Headlines;
