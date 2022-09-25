import * as React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    TextField,
    Button
} from '@mui/material';
import {
    Link as RouterLink,
    useNavigate
} from "react-router-dom";
import AuthContext from '../../context/AuthContext';

export default function SignIn() {
    const navigate = useNavigate();
    const { handleUserAuthentication } = React.useContext(AuthContext);

    const signIn = ({ email, password }) => {
        return fetch("http://localhost:9000/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
                return res.json();
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email');
        const password = data.get('password');

        const isFormValid = checkFormValidity(email, password);

        if (isFormValid) {
            signIn({ email, password })
                .then(data => {
                    if (data) {
                        localStorage.setItem('accessToken', data.accessToken);
                        handleUserAuthentication();
                        navigate('/');
                    }
                })
                .catch(status => {
                    if (status === 404) {
                        alert("User with this email and password does not exist");
                    }
                    console.log(status);
                })
        }
    };

    const checkFormValidity = (email, password) => {
        const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

        if (!email || !password) {
            return alert("Please fill all details!");
        }

        if (!isEmailValid) {
            return alert("Please enter a valid email");
        }

        return true;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to="/signup">
                                Don't have an account? Sign Up
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}