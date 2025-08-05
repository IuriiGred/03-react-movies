import axios from 'axios';
import type { Movie } from '../../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const TOKEN = import.meta.env.VITE_MY_TMDB_API_KEY;

// console.log(TOKEN);

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<FetchMoviesResponse>(BASE_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  // console.log(response.data);

  return response.data.results;
};
