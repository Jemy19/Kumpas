import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import OldDashboard from './pages/Oldashboard';
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
import UserManagement from './pages/UserManagement';
import AdminLogs from './pages/adminLogs';

// Set the base URL and credentials for Axios
axios.defaults.baseURL = 'https://kumpas.onrender.com';
axios.defaults.withCredentials = true;

// Spinner favicon handling
const favicon = document.getElementById("favicon");
const loadingSpinner = "./assets/logospin.svg";
const defaultIcon = favicon.href;

function switchToSpinner() {
  favicon.href = loadingSpinner;
}

function restoreFavicon() {
  favicon.href = defaultIcon;
}

// Add Axios interceptors for request and response
axios.interceptors.request.use((config) => {
  switchToSpinner(); // Show spinner on API request
  return config;
}, (error) => {
  restoreFavicon(); // Restore favicon on request error
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  restoreFavicon(); // Restore favicon on successful response
  return response;
}, (error) => {
  restoreFavicon(); // Restore favicon on response error
  return Promise.reject(error);
});

function App() {
  return (
    <UserContextProvider>
      <Toaster position='top-center' toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route path='*' element={<Notfound />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/Register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/Dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/OldDashboard' element={<PrivateRoute><OldDashboard /></PrivateRoute>} />
        <Route path='/Management' element={<PrivateRoute><Management /></PrivateRoute>} />
        <Route path='/vid' element={<PrivateRoute><Vidtest /></PrivateRoute>} />
        <Route path='/UserManagement' element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        <Route path='/Feedback' element={<PrivateRoute><Feedback /></PrivateRoute>} />
        <Route path='/AdminLogs' element={<PrivateRoute><AdminLogs /></PrivateRoute>} />
        <Route path='/SaDashboard' element={<SuperAdminRoute><SaDashboard /></SuperAdminRoute>} />
        <Route path='/AccManagement' element={<SuperAdminRoute><AccountManagement /></SuperAdminRoute>} />
        <Route path='/SAUserManagement' element={<SuperAdminRoute><SAUserManagement /></SuperAdminRoute>} />
        <Route path='/SASignManagement' element={<SuperAdminRoute><SASignManagement /></SuperAdminRoute>} />
        <Route path='/SAFeedbacks' element={<SuperAdminRoute><SAFeedbacks /></SuperAdminRoute>} />
        <Route path='/SALogs' element={<SuperAdminRoute><SALogs /></SuperAdminRoute>} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
