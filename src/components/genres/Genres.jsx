import React from 'react'
import "./genres.scss"

const Genres = ({genres}) => {
  return (
    <div>
        {genres.map((genre, index) => (
            <span className='navbar--genre' key={index}>{genre}</span>
        ))}
    </div>
  )
}

export default Genres