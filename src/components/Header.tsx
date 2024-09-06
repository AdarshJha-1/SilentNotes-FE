import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import {userState} from "../store/atom.ts"
import {useEffect} from "react"
import {useRecoilValue} from "recoil"
import {useNavigate} from "react-router-dom"

export const Header = () => {
  const {isLogin, user} = useRecoilValue(userState)
  useEffect(() => {
    if(!isLogin && user === null) {
      navigate("/login")
    }
  }, [])

  const handelLogout = async () => {

    console.log("logout");

  }
  return (
    <header className='text-white py-5'>
      <nav className='h-full w-1/2 mx-auto flex items-center justify-between'>
        <h1 className='text-4xl font-extrabold tracking-tighter font-mono'>SilentNotes</h1>
        <ul className='text-xl'>
          {!isLogin ?
            <Link to={"/login"}>
              <Button className='text-black font-bold' variant={"outline"}>Login</Button>
              </Link> :
            <Button onClick={handelLogout} className='text-black font-bold' variant={"outline"}>Logout</Button>
        }
        </ul>
      </nav>
      </header>
  )
}
