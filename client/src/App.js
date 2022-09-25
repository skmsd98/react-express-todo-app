import { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import jwt_decode from 'jwt-decode'
import './App.css';

import Header from './components/Header/index';
import AppRoutes from './routes/AppRoutes';

import AuthContext from './context/AuthContext';

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleUserAuthentication = () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      return setIsUserAuthenticated(false);
    }

    const data = jwt_decode(token);

    if (data) {
      setIsUserAuthenticated(true);
      setUserEmail(data.email);
    }
  }

  useEffect(() => {
    handleUserAuthentication();
  }, [])

  return (
    <>
      <CssBaseline />

      <AuthContext.Provider value={{
        isUserAuthenticated,
        userEmail,
        handleUserAuthentication
      }}>

        <Header />
        <AppRoutes />

      </AuthContext.Provider>
    </>
  );
}

export default App;