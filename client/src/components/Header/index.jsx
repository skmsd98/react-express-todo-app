import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../../context/AuthContext';

export default function Header() {
    const { isUserAuthenticated, handleUserAuthentication } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        handleUserAuthentication();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todo App
                    </Typography>
                    {
                        isUserAuthenticated &&
                        <Button variant="contained" onClick={handleLogout} color="error">
                            <LogoutIcon sx={{ marginRight: '10px' }} />
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}