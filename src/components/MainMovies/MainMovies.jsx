import React, { useState, useEffect } from 'react'
import "./mainMovies.scss"
import getMovies from '../../services/getMovies';
import getCinemaShows from '../../services/getCinemaShows';
import getMoviesGenre from '../../services/getGenreMovies';
import { useNavigate } from 'react-router-dom';


const MainMovies = ({ isLogin }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState([]);
  const navigate = useNavigate()

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

  const date = (releaseDate) => {
    const date = releaseDate.split("-")
    const month = getMonth(date[1])

    return `${date[2]} ${month} ${date[0]}`
  }

  const getMonth = (month) => {
    switch (month) {
      case "01": return "Ene"
      case "02": return "Feb"
      case "03": return "Mar"
      case "04": return "Abr"
      case "05": return "May"
      case "06": return "Jun"
      case "07": return "Jul"
      case "08": return "Ago"
      case "09": return "Sep"
      case "10": return "Oct"
      case "11": return "Nov"
      case "12": return "Dic"
      default: return "Unknown"
    }
  }

  const changeView = (id) => {
    if (!isLogin) {
      navigate(`${id}`, { state: id })
    }
  }

  return (
    <>
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
    </>
  )
}

export default MainMovies