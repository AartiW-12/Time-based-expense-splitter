
import Dashboard from './components/dashboard/Dashboard.jsx'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar.jsx'
import CreateGroup from './components/group/create-group/CreateGroup.jsx'
import GroupDetails from './components/group/group-details/GroupDetails.jsx'
import Login from './components/auth/Login.jsx'
import SignUp from './components/auth/SignUp.jsx'
import Home from './pages/Home.jsx'
import Profile from './components/profile/Profile.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import { useAuth } from './components/auth/AuthContext.jsx'

function ProtectedRedirect({ children }) {
  // 
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        {/* ✅ If logged in, / redirects to dashboard */}
        <Route path='/' element={
          <ProtectedRedirect>
            <Home />
          </ProtectedRedirect>
        } />
        <Route path='/login' element={
          <ProtectedRedirect>
            <Login />
          </ProtectedRedirect>
        } />
        <Route path='/signup' element={
          <ProtectedRedirect>
            <SignUp />
          </ProtectedRedirect>
        } />

        {/* These stay the same */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/create-group' element={<CreateGroup />} />
        <Route path='/group/:groupId' element={<GroupDetails />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
