import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../Header/Header';

export const Movie = () => {
  const [movies, setMovies] = useState([]); 

  async function getTrendingMovies() {
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=f60f5d303c0eb38ae91f1f1ef084b885')
  
      setMovies(data.results);
  
  }

  useEffect(() => {
    getTrendingMovies();
  }, []); 

  return (
    <>
      <div>
        <Header
          title="Trending Movies"
          desc=""
          height="75"
        />
      </div>
      <div className="container-movies">
        <h2 className='mb-3 mt-5'>Trending Movies</h2>
        <div className='row'>
          {movies.map((movie, index) => (
            <div className="col-md-3 mb-3 text-center" key={index}>
              <div className="card p-2">
                <img
                  className="image-movies rounded"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.overview}
                />
                <h3 className="heading3-movies">{movie.title.split(" ").slice(0,3).join(" ")}</h3>
                <p className="paragraph-movies">Votes: {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
