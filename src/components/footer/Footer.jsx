import React from 'react'
import "./footer.scss"
import facebook from "../../assets/images/facebook-logo.svg"
import twitter from "../../assets/images/twitter-logo.svg"
import instagram from "../../assets/images/instagram-logo.svg"

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
            <img src={facebook} alt="facebook icon" />
            <img src={twitter} alt="twitter icon" />
            <img src={instagram} alt="instagram icon" />
          </figure>
        </section>
      </article>
      <p className='footer__rights' >© 2023 - Información tomada de TMBD (the Movie Database)</p>
    </footer>
  )
}

export default Footer