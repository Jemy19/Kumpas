import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // Track error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsError(true);
      return;
    }

    try {
      await axios.post(`/resetpassword/${token}`, { password });
      setMessage('Password reset successfully.');
      setIsError(false); // Success case
    } catch (error) {
      setMessage('Error resetting password.');
      setIsError(true); // Error case
    }
  };

  return (
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Reset Password
        </button>
        {message && (
          <p className={`mt-4 text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
