import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import OldDashboard from './pages/Oldashboard'
import Management from './pages/Management';
import PublicRoute from './components/PublicRoute';
import Vidtest from './pages/vidtest';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Toaster position = 'top-center' toastOptions={{duration: 4000}}/>
      <Routes>
        <Route path='/' element={<PublicRoute><Home /></PublicRoute>} />
        <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/Register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/Dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/OldDashboard' element={<PrivateRoute><OldDashboard /></PrivateRoute>} />
        <Route path='/Management' element={<PrivateRoute><Management /></PrivateRoute>} />
        <Route path='/vid' element={<PrivateRoute><Vidtest /></PrivateRoute>} />
      </Routes>
    </UserContextProvider>  
  )
}

export default App
