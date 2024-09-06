import React from 'react'
import {userState} from "../store/atom.ts"
import {useEffect} from "react"
import {useRecoilValue} from "recoil"
import {useNavigate} from "react-router-dom"

export const NoShowing = ({children}: {children: react.ReactNode}) => {
  const {isLogin, user} = useRecoilValue(userState)
  const navigate = useNavigate()
  console.log(isLogin, user, localStorage.getItem("token"));

  useEffect(() => {
    if(isLogin && user !== null) {
      navigate("/Dashboard")
    }
  }, [])

  return (
    <div>{children}</div>
  )
}
