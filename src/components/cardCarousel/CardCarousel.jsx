import React from 'react'
import "./cardCarousel.scss"

const CardCarousel = ({ movie, listGenre }) => {

    const filteredGenre = (genres) => {
        const filteredGenres = [...listGenre].filter((genreItem) => (genres.find(genre => genre === genreItem.id)))
        return filteredGenres
    }

    return (
        <section className="card">
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            <div className='card-content'>
                <h2>{movie.title}</h2>
                <h3>Título en inglés: {movie.original_title}</h3>
                <p>Estreno: {movie.release_date}</p>
                <p>Género:
                    {filteredGenre(movie.genre_ids).map(genre => (<span key={genre.id}>{genre.name}</span>))}
                </p>
                <div>
                    <p>
                        {
                            movie.adult ? "Para mayores de 18 años" : "Para todo el público"
                        }
                    </p>
                </div>
            </div>
        </section>
    )
}

export default CardCarousel