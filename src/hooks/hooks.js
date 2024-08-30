import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchNews = (url) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setArticles([]);
      setError(null);
      try {
        // let response;
        // setTimeout(() => {
        //   response = axios.get(url);
        // }, [0]);
        const response = await axios.get(url);
        setArticles(response.data.articles);
        console.log(response.data.articles);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [url]);

  return { articles, isLoading, error };
};
