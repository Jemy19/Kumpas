import React, { useState } from 'react';
import axios from 'axios'; // Add axios import
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'; // Import Link
import LogoOverlay from '../components/logooverlay';
import {toast} from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // Track error state
  const [butloading, setbutLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setbutLoading(true); 
      await axios.post('/forgotpassword', {
        email,
      });
      toast.success('Check your email for reset instructions.');
      setMessage('Check your email for reset instructions.');
      setIsError(false); // Success case
    } catch (error) {
      toast.error('Error sending password reset. Try again.');
      setMessage('Error sending password reset. Try again.');
      setIsError(true); // Error case
    } finally {
      setbutLoading(false); // Hide loading overlay
    }
  };

  return (
    <>
      <LogoOverlay/>
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 space-y-6 bg-white rounded shadow-lg">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <p className="text-gray-600">Enter your email and we'll send you a link to reset your password.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Your email"
            required
          />
          <Button
            type="submit"
            disabled={butloading}
            className={`w-full h-10 select-none${butloading ? 'bg-gray-400 cursor-not-allowed translate-y-1 select-none' : ''}`}
          >
            {butloading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          {message && (
            <p className={`mt-4 text-sm select-none${isError ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
          <Link to="/login" className="mt-4 text-blue-500 hover:underline">
            Go Back to Login
          </Link>
        </form>
        
      </div>
    </>
  );
};

export default ForgotPassword;
