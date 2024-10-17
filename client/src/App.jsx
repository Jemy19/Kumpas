import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Management from './pages/Management';
import PublicRoute from './components/PublicRoute';
import Vidtest from './pages/vidtest';
import Feedback from './pages/Feedback';
import SaDashboard from './pages/superAdmin/saDashboard';
import SuperAdminRoute from './components/SuperAdminRoute';
import AccountManagement from './pages/superAdmin/AccountManagement';
import SAUserManagement from './pages/superAdmin/saUserManagement';
import SASignManagement from './pages/superAdmin/saSignManagement';
import SAFeedbacks from './pages/superAdmin/saFeedback';
import SALogs from './pages/superAdmin/saLogs';
import Notfound from './pages/404NotFound/404';
import Update from './pages/updates';
import SaUpdate from './pages/superAdmin/saUpdates';
import ResetPassword from './pages/resetpassword';
import ForgotPassword from './pages/forgotpassword';
import Homepage from './pages/Homepage'
import UserManagement from './pages/UserManagement';
import AdminLogs from './pages/adminLogs';

axios.defaults.baseURL = 'https://kumpas.onrender.com';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Toaster position = 'top-center' toastOptions={{duration: 4000}}/>
      <Routes>
        <Route path='*' element={<Notfound />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/ResetPassword/:token' element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path='/ForgotPassword' element={<PublicRoute><ForgotPassword /></PublicRoute>} />


        <Route path='/Dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/Management' element={<PrivateRoute><Management /></PrivateRoute>} />
        <Route path='/vid' element={<PrivateRoute><Vidtest /></PrivateRoute>} />
        <Route path='/UserManagement' element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        <Route path='/Feedback' element={<PrivateRoute><Feedback /></PrivateRoute>} />
        <Route path='/AdminLogs' element={<PrivateRoute><AdminLogs /></PrivateRoute>} />
        <Route path='/Updates' element={<PrivateRoute><Update /></PrivateRoute>} />


        <Route path='/SaDashboard' element={<SuperAdminRoute><SaDashboard /></SuperAdminRoute>} />
        <Route path='/AccManagement' element={<SuperAdminRoute><AccountManagement /></SuperAdminRoute>} />
        <Route path='/SAUserManagement' element={<SuperAdminRoute><SAUserManagement /></SuperAdminRoute>} />
        <Route path='/SASignManagement' element={<SuperAdminRoute><SASignManagement /></SuperAdminRoute>} />
        <Route path='/SAFeedbacks' element={<SuperAdminRoute><SAFeedbacks /></SuperAdminRoute>} />
        <Route path='/SALogs' element={<SuperAdminRoute><SALogs /></SuperAdminRoute>} />
        <Route path='/SaUpdate' element={<SuperAdminRoute><SaUpdate /></SuperAdminRoute>} />
      </Routes>
    </UserContextProvider>  
  )
}

export default App
