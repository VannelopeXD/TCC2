import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center px-4 md:px-16 lg:px-56 gap-6 bg-gray-100 min-h-screen'>
      {/* Título principal */}
      <h1 className='font-extrabold text-4xl md:text-5xl text-center mt-8 md:mt-16'>
        <span className='text-[#4169E1]'>Descubra sua próxima aventura</span> com roteiros personalizados 😎
      </h1>

      {/* Texto adicional */}
      <p className='text-lg md:text-xl text-gray-500 text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      {/* Botão */}
      <Link to={'/create-trip'}>
        <Button className='bg-[#4169E1] text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-700 transition'>
        Pergunte Agora!
      </Button>
      </Link>
      <img src='/landing.png'/>
    </div>
  )
}

export default Hero
