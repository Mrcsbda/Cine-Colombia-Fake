import React from 'react'
import "./genres.scss"

const Genres = ({genres}) => {

  const handleGenre = (id) => {
    console.log(id)
  }
  return (
    <>
        {genres.map((genre, index) => (
            <span className='navbar--genre' key={index} onClick={()=> handleGenre(genre.id)}>{genre.name}</span>
        ))}
    </>
  )
}

export default Genres