import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import Spinner from './spinner'; // Import the spinner component

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        axios.get('/profile', { withCredentials: true })
            .then(({ data }) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when request completes
            });
    }, []);

    const logout = () => {
        axios.post('/logout').then(() => {
            setUser(null);
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
