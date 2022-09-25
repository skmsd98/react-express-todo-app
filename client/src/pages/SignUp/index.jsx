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

export default function SignUp() {
    const navigate = useNavigate();

    const signUp = ({ name, email, password }) => {
        return fetch("http://localhost:9000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
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

        const name = data.get('name');
        const email = data.get('email');
        const password = data.get('password');

        const isFormValid = checkFormValidity(name, email, password);

        if (isFormValid) {
            signUp({ name, email, password })
                .then(data => {
                    data && navigate('/signin');
                })
                .catch(status => {
                    if (status === 409) {
                        alert("User with this email exists!")
                    }
                    console.log(status);
                })
        }
    };

    const checkFormValidity = (name, email, password) => {
        const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

        if (!name || !email || !password) {
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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <RouterLink to="/signin">
                                Already have an account? Sign in
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}