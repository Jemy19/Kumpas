import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import Spinner from './spinner'; // Import the spinner component
import toast from 'react-hot-toast';

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        if (user !== null) {
            setLoading(false);
            return; // Early exit if user is already defined
        }
    
        console.log("Fetching user profile...");
        axios.get('/profile', { withCredentials: true })
            .then(({ data }) => {
                if (!data) {
                    // No user data indicates an issue, but we shouldn't show an error yet
                    return; // Early exit
                }
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
                
                // Check if the error response indicates that the session has expired
                if (error.response && error.response.status === 401) {
                    // Show session expired message only if 401 Unauthorized is returned
                    toast.error('Session expired, please login again', { autoClose: 8000 });
                }
            })
            .finally(() => {
                setLoading(false); // Set loading to false when request completes
            });
    }, [user]); 

    const logout = () => {
        setLoading(true);
        axios.post('/logout').then(() => {
            setUser(null);
            setLoading(false); 
        });
    };

    const isAdmin = user && user.role === 'admin';
    const isSuperadmin = user && user.role === 'super_admin';

    if (loading) {
        return <Spinner />; // Render the spinner while loading
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout, loading, isAdmin, isSuperadmin }}>
            {children}
        </UserContext.Provider>
    )
}
