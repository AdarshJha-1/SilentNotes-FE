import { Route, Routes } from "react-router-dom"
import { Preview } from "./components/Preview"
import { SignUp } from "./components/SignUp"
import { Verify } from "./components/Verify"
import { Login } from "./components/Login"
import { Header } from "./components/Header"
import { Dashboard } from "./components/Dashboard"
import { Protected} from "./components/Protected"
import { NoShowing} from "./components/NoShowing"

export const App = () => {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col">
      <Header />
        <Routes>
          <Route path="/" element={<NoShowing><Preview /></NoShowing>} />
          <Route path="/sign-up" element={<NoShowing><SignUp/></NoShowing>} />
          <Route path="/verify/:username" element={<NoShowing><Verify /></NoShowing>} />
          <Route path="/login" element={<NoShowing><Login /></NoShowing>} />
          <Route path="/dashboard" element={<Protected>
            <Dashboard />
            </Protected>} />
        </Routes>
      </main>
  )
}
