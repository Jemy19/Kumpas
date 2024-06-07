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

import Navbar from "@/components/Navbar";

export function Login() {
  useEffect(() => {
    // Set overflow-y to hidden on body when component mounts
    document.body.style.overflowY = 'hidden';
    // Reset overflow-y to auto when component unmounts
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const loginUser = async (e) => {
    e.preventDefault()
      const {email, password} = data
      try {
        const {data} = await axios.post('/login', {
          email,
          password
        })
        if(data.error) {
          toast.error(data.error)
        } else {
          setUser(data);
          setData({});
          navigate('/Dashboard')
        }
      } catch (error) {
        
      }
  }

  return (
    <>
    <Navbar />
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
                type='email' placeholder='Enter Email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input type='password' placeholder='Enter Password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
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
  )
}

export default Login;
