import { Route, Routes } from "react-router-dom"
import { Preview } from "./components/Preview"
import { SignUp } from "./components/SignUp"
import { Login } from "./components/Login"
import { Header } from "./components/Header"

export const App = () => {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Preview />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  )
}