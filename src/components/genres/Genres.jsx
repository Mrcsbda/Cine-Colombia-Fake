import React, { useContext } from 'react'
import "./genres.scss"
import { AppContext } from '../../routes/Router'

const Genres = ({ genres }) => {
  const { setFilteredMoviesBy, setValueToFilterMovies  , filteredMoviesBy} = useContext(AppContext)
  const handleGenre = (id) => {

    if (id === 0) {
      setFilteredMoviesBy(false)
      setValueToFilterMovies(false)
    } else {
      setFilteredMoviesBy("genre")
      setValueToFilterMovies(id)
    }
    
  }
  return (
    <>
      {genres.map((genre, index) => (
        <span className='navbar--genre' key={index} onClick={() => handleGenre(genre.id)}>{genre.name}</span>
      ))}
    </>
  )
}

export default Genres