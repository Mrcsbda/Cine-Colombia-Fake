import React from 'react'
import "./genres.scss"

const Genres = ({genres}) => {
  return (
    <>
        {genres.map((genre, index) => (
            <span className='navbar--genre' key={index}>{genre}</span>
        ))}
    </>
  )
}

export default Genres