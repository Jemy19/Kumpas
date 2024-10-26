import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LogoOverlay from '../components/logooverlay';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // Track error state
  const [butloading, setbutLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbutLoading(true); 
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      setbutLoading(false); // Stop loading if validation fails
      return;
    }
  
    // Check if password has at least one uppercase letter, one lowercase letter, one number, and one special character
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[@$!%*?&]/;
  
    if (!uppercaseRegex.test(password)) {
      toast.error('Password must include at least one uppercase letter.');
      setbutLoading(false);
      return;
    }
  
    if (!lowercaseRegex.test(password)) {
      toast.error('Password must include at least one lowercase letter.');
      setbutLoading(false);
      return;
    }
  
    if (!numberRegex.test(password)) {
      toast.error('Password must include at least one number.');
      setbutLoading(false);
      return;
    }
  
    if (!specialCharRegex.test(password)) {
      toast.error('Password must include at least one special character.');
      setbutLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setbutLoading(false);
      setIsError(true);
      return;
    }

    try {
      await axios.post(`/resetpassword/${token}`, { password });
      setMessage('Password reset successfully.');
      setIsError(false); // Success case
      navigate('/Login');
      toast.success('Password reset successfully!')  
    } catch (error) {
      setMessage('Error resetting password.');
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
        <h2 className="text-2xl font-bold">Reset Password</h2>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="New password"
            required
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Confirm new password"
            required
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <div className="bg-gray-100 p-4 border border-gray-300 rounded-md shadow-md">
          <p className="text-gray-800 font-semibold mb-2">Password Requirements:</p>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>Must contain at least 1 uppercase letter ❌</li>
            <li>Must contain at least 1 number ❌</li>
            <li>Must contain at least 1 symbol ❌</li>
            <li>Must be at least 8 characters ❌</li>
          </ul>
        </div>
        <Button
          type="submit"
          disabled={butloading}
          className={`w-full h-10 select-none ${butloading ? 'bg-gray-400 cursor-not-allowed translate-y-1 select-none' : ''}`}
        >
          {butloading ? 'Sending...' : 'Send Reset Link'}
        </Button>
        {message && (
          <p className={`mt-4 text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
    </>
  );
};

export default ResetPassword;
