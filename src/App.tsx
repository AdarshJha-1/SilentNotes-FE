import { Route, Routes } from "react-router-dom"
import { Preview } from "./components/Preview"
import { SignUp } from "./components/SignUp"
import { Verify } from "./components/Verify"
import { Login } from "./components/Login"
import { Header } from "./components/Header"
import { Dashboard } from "./components/Dashboard"

export const App = () => {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Preview />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify/:username" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  )
}
