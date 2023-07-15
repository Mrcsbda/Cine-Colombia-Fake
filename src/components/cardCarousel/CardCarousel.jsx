import React from 'react'
import "./cardCarousel.scss"

const CardCarousel = ({ movie, listGenre }) => {

    const filteredGenre = (genres) => {
        const filteredGenres = [...listGenre].filter((genreItem) => (genres.find(genre => genre === genreItem.id)))
        return filteredGenres
    }

    return (
        <section className="image">
            <img  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            <div>
                <h2>{movie.title}</h2>
                <h3>Título en inglés: {movie.original_title}</h3>
                <p>Estreno: {movie.release_date}</p>
                <p>Género:
                    {filteredGenre(movie.genre_ids).map(genre => (<span key={genre.id}>{genre.name}</span>))}
                </p>
                <div>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </section>
    )
}

export default CardCarousel