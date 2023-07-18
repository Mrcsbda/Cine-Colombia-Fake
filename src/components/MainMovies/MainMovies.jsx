import React, {useState, useEffect} from 'react'
import "./mainMovies.scss"
import getMovies from '../../services/getMovies';
import getCinemaShows from '../../services/getCinemaShows';
import getMoviesGenre from '../../services/getGenreMovies';


const MainMovies = () => {
    const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const dataMovies = await getMovies()
    const dataCinemaShows = await getCinemaShows()
    const moviesId = [...dataCinemaShows].map((show) => (show.movie))
    const filteredMovies = [...dataMovies].filter((movie) => moviesId.find(movieId => movie.id === movieId))
    const dataMoviesGenre = await getMoviesGenre()
    setFilteredMovies(filteredMovies)
    setMoviesGenre(dataMoviesGenre)
  }

  const filteredGenre = (genres) => {
    const filteredGenres = [...moviesGenre].filter((genreItem) => (genres.find(genre => genre === genreItem.id)))
    return filteredGenres
}
  return (
    <>
        <p className='title'>en cartelera</p>
      <div className='cards-container'>
        {filteredMovies.map((movie) => (
          <div className='card' key={movie.title}>
            <figure>
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            </figure>
            <h2>{movie.title}</h2>
            <p>Titulo en ingles: {movie.original_title}</p>
            <p>Estreno: {movie.release_date}</p>
            <p>Genero: {filteredGenre(movie.genre_ids).map(genre => (<span key={genre.id}>{genre.name}, </span>))}</p>
            <span className='age-restriction'>{movie.adult ? "Para mayores de 18 años" : "Para todo el público"}</span>
          </div>
        )
        )}
        
      </div>
    </>
  )
}

export default MainMovies