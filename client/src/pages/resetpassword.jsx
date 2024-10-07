import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarLog from "@/components/NavbarLog";
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // Track error state
  const [butloading, setbutLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbutLoading(true); 
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
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
      <NavbarLog/>
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold">Reset Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="New password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Confirm new password"
          required
        />
        <Button
          type="submit"
          disabled={butloading}
          className={`w-full h-10 ${butloading ? 'bg-gray-400 cursor-not-allowed translate-y-1' : ''}`}
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
