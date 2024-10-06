import React, { useState } from 'react';
import axios from 'axios'; // Add axios import

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // Track error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/forgotpassword', {
        email,
      });
      setMessage('Check your email for reset instructions.');
      setIsError(false); // Success case
    } catch (error) {
      setMessage('Error sending password reset. Try again.');
      setIsError(true); // Error case
    }
  };

  return (
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Send Reset Link
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

export default ForgotPassword;
