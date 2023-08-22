
import { Button, Avatar, Box, FormControlLabel, Grid, Paper, TextField, Checkbox, Typography, CssBaseline, Alert, AlertTitle } from "@mui/material"

import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const paperStyle = {
        padding: 20,
        height: '45vh',
        width: 370,
    };

    const avatarStyle = {
        backgroundColor: '#1bbd7e',
    };

    const buttonStyle = {
        marginBottom: 8,
    };

    const handleLogin = async (e: React.MouseEvent) => {
        setError(false);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/username/${username}`);
        if (response.status !== 404) {
            const data = response.data;
            if (data.password === password)
                navigate('../menu');
        }
        setError(true);
    }


    const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div>
            {/* <CssBaseline/> */}
            <Box>
                <Paper elevation={10} style={paperStyle} >
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{paddingBottom: 1, paddingTop: 2}}>
                        <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                    </Box>
                    <h2>Log in</h2>
                    <TextField 
                        label="Username"
                        onChange={handleUsernameInput}
                        required
                        placeholder="Enter username..."
                        fullWidth/>
                    <TextField 
                        label="Password"
                        onChange={handlePasswordInput}
                        required
                        placeholder="Enter password..."
                        type="password"
                        fullWidth/>
                    <FormControlLabel
                        control={
                            <Checkbox name="checkBox" color="primary"/>
                        }
                        label="Remember Me"
                    />
                    <Button style={buttonStyle} type="submit" color="primary" onClick={handleLogin} fullWidth variant="contained"> Log in </Button>
                    <Typography> You don't have an account?      
                        <Link to="#" style={{paddingLeft: 2}}>
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Box>
            {!error && 
                <Alert>
                    <AlertTitle>
                        Login error
                    </AlertTitle>
                        Username or password incorrect
                </Alert>
            }
        </div>
    );

}

export default LoginPage;