import React from 'react'
import "./footer.scss"

const Footer = () => {
  return (
    <footer className='footer'>
      <article className='footer__info'>
        <p className='footer__logo'>CINE COLOMBIA</p>
        <ul className='footer__nav'>
          <li>Información Legal</li>
          <hr />
          <li>Acerca de Cineco</li>
          <hr />
          <li>Contáctanos PQRS</li>
          <hr />
          <li>Preguntas Frecuentes</li>
        </ul>
        <section className='footer__social-networks-container' >
          <p>Síguenos en redes sociales</p>
          <figure className='footer__social-networks'>
            <img src="images/facebook-logo.svg" alt="facebook icon" />
            <img src="images/twitter-logo.svg" alt="twitter icon" />
            <img src="images/instagram-logo.svg" alt="instagram icon" />
          </figure>
        </section>
      </article>
      <p className='footer__rights' >© 2023 - Información tomada de TMBD (the Movie Database)</p>
    </footer>
  )
}

export default Footer