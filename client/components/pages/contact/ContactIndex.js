import React from 'react'
import { Link } from 'react-router-dom'

const ContactIndex = () => {

  return (
    <div className='contact-wrapper'>
      <div className='contact-info' >
        <p className='contact-email'>Email: Anatoly.Tsinker13@gmail.com</p>
        <p className='contact-github'>Github: <a href='https://github.com/DN92'>https://github.com/DN92</a> </p>
        <p className='contact-phone'>I can be reached at: 347-549-7451</p>
      </div>
      <div>Send Me a Message</div>
    </div>
  )
}

export default ContactIndex
