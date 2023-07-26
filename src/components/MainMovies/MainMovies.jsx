import React, { useState, useEffect, useContext } from 'react'
import getMovies from '../../services/getMovies';
import getMoviesGenre from '../../services/getGenreMovies';
import { useNavigate } from 'react-router-dom';
import { getMonth } from '../../utils/getMonth';
import { AppContext } from '../../routes/Router';
import getCinemaShows from '../../services/cinemaShowsServices';
import "./mainMovies.scss"
import { getCinemaAndCinemaShows } from '../../services/cinemasServices';


const MainMovies = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState([]);
  const navigate = useNavigate()
  const { isLogin, filteredMoviesBy, valueToFilterMovies } = useContext(AppContext)

  useEffect(() => {
    getData()
  }, [valueToFilterMovies])

  const getData = async () => {
    const dataMovies = await getMovies()
    const dataCinemaShows = await getCinemaShows()
    const moviesId = [...dataCinemaShows].map((show) => (show.movie))
    const filteredMovies = [...dataMovies].filter((movie) => moviesId.find(movieId => movie.id === movieId))
    const dataMoviesGenre = await getMoviesGenre()

    filterMoviesBy(filteredMovies)
    setMoviesGenre(dataMoviesGenre)
  }

  const filterMoviesBy = async (dataMovies) => {
    // console.log(filteredMoviesBy)
    // console.log(valueToFilterMovies)
    switch (filteredMoviesBy) {
      case "genre":
        const filteredMoviesByGenre = dataMovies.filter(movie => movie.genre_ids.includes(valueToFilterMovies))
        setFilteredMovies(filteredMoviesByGenre)
        break;
      case "cinema":
        const cinemasAndCinemaShows = await getCinemaAndCinemaShows()
        const cinemaFiltered = cinemasAndCinemaShows.find(cinema => cinema.name === valueToFilterMovies)
        const movies = dataMovies.filter(item => cinemaFiltered.cinema_shows.find(movie => item.id === movie.movie))
        setFilteredMovies(movies)
        break;
      default: setFilteredMovies(dataMovies)
        break
    }
  }

  const filteredGenre = (genres) => {
    const filteredGenres = [...moviesGenre].filter((genreItem) => (genres.find(genre => genre === genreItem.id)))
    return filteredGenres
  }

  const date = (releaseDate) => {
    const date = releaseDate.split("-")
    const month = getMonth(date[1])

    return `${date[2]} ${month} ${date[0]}`
  }

  const changeView = (id) => {
    if (!isLogin) {
      navigate(`${id}`)
    }
    else {
      navigate("movie")
    }
  }

  return (
    <div className='main-movies'>
      <p className='title'>en cartelera</p>
      <div className='cards-container'>
        {filteredMovies.map((movie) => (
          <div className='card' key={movie.title} onClick={() => changeView(movie.id)} >
            <figure>
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            </figure>
            <div className='card-info'>
              <h2>{movie.title}</h2>
              <p>Titulo en ingles: {movie.original_title}</p>
              <p>Estreno: {date(movie.release_date)}</p>
              <p>Genero: {filteredGenre(movie.genre_ids).map(genre => (<span key={genre.id}>{genre.name} </span>))}</p>
              <span className='age-restriction'>{movie.adult ? "Para mayores de 18 años" : "Para todo el público"}</span>
            </div>

          </div>
        )
        )}

      </div>
    </div>
  )
}

export default MainMovies