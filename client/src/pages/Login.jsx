import MyImage from "../assets/lmao.jpg"
import { Link } from 'react-router-dom';
import { useEffect } from 'react'; // Import useEffect
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState, useContext } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext';

import NavbarLog from "@/components/NavbarLog";

export function Login() {

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // <-- Add state for showing/hiding password

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      const { data } = await axios.post('/login', {
        email,
        password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data);
        setData({ email: '', password: '' });
        if (data.role === 'super_admin') {
          navigate('/SaDashboard');
        } else if (data.role === 'admin') {
          navigate('/Dashboard');
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Session expired, please login again');
      } else {
        toast.error('Network error or server issue. Please try again.');
      }
    }
  };

  return (
    <>
      <NavbarLog />
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center mt-20 lg:-mt-20 mb-20">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <form onSubmit={loginUser}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter Email..."
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setShowPassword(!showPassword)} // <-- Toggle show/hide password
                    >
                      {showPassword ? 'Hide' : 'Show'} Password
                    </Button>
                  </div>
                  <Input
                    type={showPassword ? 'text' : 'password'} // <-- Change input type based on state
                    placeholder="Enter Password..."
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src={MyImage}
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
