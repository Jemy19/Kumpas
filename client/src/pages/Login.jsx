import MyImage from "../assets/lmao.jpg";
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import NavbarLog from "@/components/NavbarLog";
import LoadingOverlay from "@/components/LoadingOverlay";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

export function Login() {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    setLoading(true); // Show loading overlay

    try {
      const response = await axios.post('/login', { email, password });
      const { data } = response;

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
    } finally {
      setLoading(false); // Hide loading overlay
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />} {/* Show loading overlay if loading */}
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
                <div className="grid gap-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password..."
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Reversed icons */}
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full select-none">
                  Login
                </Button>
              </div>
              <Link to="/ForgotPassword" className="text-blue-500 hover:underline">
                Forgot your password?
              </Link>
            </form>
          </div>
        </div>
        <div className="hidden bg-muted lg:block pointer-events-none">
          <img
            src={MyImage}
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale select-none pointer-events-none"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
