import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"

const App = () => {

  const { authUser, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<SettingsPage />} />
        <Route path="/" element={<ProfilePage />} />
      </Routes>

      {/* <Toaster /> */}
    </>
  )
}

export default App
