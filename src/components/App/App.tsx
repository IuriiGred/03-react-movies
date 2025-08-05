import './App.module.css';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    setMovies([]);

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error('No movies found for your request.');
      }

      setMovies(results);
    } catch {
      setIsError(true);
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {movies.length > 0 && !isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal onClose={handleCloseModal} movie={selectedMovie} />
      )}
    </>
  );
}
