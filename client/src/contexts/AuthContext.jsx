import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

// Create our AuthContext [CREATES the WRAPPER]
const AuthContext = React.createContext()

// Create our basic AuthProvider, to allow access to context values [DEFINES the WRAPPER]
export function AuthProvider({ children }) {
  // User State, Mount Request & Variables
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const userData = getCurrentUser();
    setUser(userData);
  }, []);

  // Register & Login Function
  const loginSaveUser = async (data) => {
    const { token } = data;
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
  };

  // Get Current User Function
  function getCurrentUser() {
    try {
      const token = localStorage.getItem("token");
      const savedUser = jwtDecode(token);
      return savedUser;
    } catch (error) {
      return null;
    }
  }
  
  // Logout Function
  const logout = () => {
    // localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  // Define the value attribute with props above
  const value = {
    user,
    getCurrentUser,
    loginSaveUser,
    logout
  }

  // The Provider takes a "value" attribute 
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;