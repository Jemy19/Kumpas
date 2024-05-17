import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/login'
import Navbar from './components/Navbar';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Toaster position = 'buttom right' toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </UserContextProvider>  
  )
}

export default App
