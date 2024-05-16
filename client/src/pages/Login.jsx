import { useState, useContext } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext';

export default function Login() {
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
          navigate('/dashboard')
        }
      } catch (error) {
        
      }
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input type='email' placeholder='Enter Email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password</label>
        <input type='password' placeholder='Enter Password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
