import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import {userState} from "../store/atom.ts"
import {useEffect} from "react"
import {useRecoilValue, useSetRecoilState} from "recoil"
import {useNavigate} from "react-router-dom"
import axios, { AxiosError } from 'axios'
import { ResponseType } from '../types/response.ts'
import { useToast } from "./ui/use-toast"

export const Header = () => {
  const {isLogin, user} = useRecoilValue(userState)
  const navigate = useNavigate() 
  const {toast} = useToast()
  const setUserState = useSetRecoilState(userState);
  const handelLogout = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_BE_API + "/sign-out", null, {
        withCredentials: true,
      })

      const response: ResponseType = res.data

      if (!response.success || !response) {
        toast({
          title: response.message,
          description: response.error,
        })
      } else {
        setUserState({ user: null, isLogin: false })
        toast({
          title: response.message,
        })
        navigate("/login")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Error',
          description: error.response?.data?.message || error.message,
        });
        console.error('Axios error:', error);
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred',
        });
        console.error('Unexpected error:', error);
      }
    } 

  }
  return (
    <header className='text-white py-7'>
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
