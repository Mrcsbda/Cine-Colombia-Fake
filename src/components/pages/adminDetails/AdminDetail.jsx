import React from 'react'
import "./adminDetails.scss"
import MovieDetailsAdmin from '../../movieDetails/MovieDetailsAdmin'
import DetailsShowsAdmin from '../../detailsShows/DetailsShowsAdmin'

const AdminDetail = () => {
  return (
    <section className='movie-details'>
      <MovieDetailsAdmin/>
      <DetailsShowsAdmin/>
    </section>
  )
}

export default AdminDetail