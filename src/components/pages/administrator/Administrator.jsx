import React from 'react'
import "./admin.scss"
import { Outlet } from 'react-router-dom';

const Administrator = () => {

  return (
    <section className='main--movies'>
      <Outlet />
    </section>
  )
}

export default Administrator