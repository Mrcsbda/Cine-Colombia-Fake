import React from 'react'
import './home.scss'
import MainHome from '../main-home/MainHome'
import Carousel from '../carousel/Carousel'


const Home = () => {
  return (
    <div>
      <Carousel />
      <MainHome />
    </div>
  )
}

export default Home