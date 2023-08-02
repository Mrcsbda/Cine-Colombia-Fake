import React from 'react'
import "./cardCarousel.scss"
import { getMonth } from '../../utils/getMonth'

const CardCarousel = ({ movie, listGenre }) => {

    const filteredGenre = (genres) => {
        const filteredGenres = [...listGenre].filter((genreItem) => (genres.find(genre => genre === genreItem.id)))
        return filteredGenres
    }

    const date = (releaseDate) => {
        const date = releaseDate.split("-")
        const month = getMonth(date[1])

        return `${date[2]} ${month} ${date[0]}`
    }

    return (
        <>
            {
                movie?.title && (
                <section className="card-carousel">
                    <img className="card-carousel__poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                    <div className="card-carousel__content">
                        <h2 className="card-carousel__title">{movie.title}</h2>
                        <p className="card-carousel__subtitle">Título en inglés: {movie.original_title}</p>
                        <p className="card-carousel__release">Estreno: {date(movie.release_date)}</p>
                        <p className="card-carousel__genre">Género:
                            {filteredGenre(movie.genre_ids).map(genre => (<span key={genre.id}> {genre.name} </span>))}
                        </p>
                        <div className="card-carousel__classification-container">
                            <p className="card-carousel__classification">
                                {
                                    movie.adult ? "Para mayores de 18 años" : "Para todo el público"
                                }
                            </p>
                        </div>
                    </div>
                </section>)
            }
        </>
    )
}

export default CardCarousel