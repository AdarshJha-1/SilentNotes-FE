import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export const Header = () => {
  return (
    <header className='text-white py-5'>
      <nav className='h-full w-1/2 mx-auto flex items-center justify-between'>
        <h1 className='text-4xl font-extrabold tracking-tighter font-mono'>AMA</h1>
        <ul className='text-xl'>
          <Link to={"/login"}>
            <Button className='text-black font-bold' variant={"outline"}>Login</Button>
          </Link>
        </ul>
      </nav>
    </header>
  )
}
