
import { Button, Avatar, Box, FormControlLabel, Grid, Paper, TextField, Checkbox, Typography, CssBaseline } from "@mui/material"

import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const LoginPage = () => {


    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


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

    return (
        <div>
            {/* <CssBaseline/> */}
            <Box>
                <Paper elevation={10} style={paperStyle} >
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{paddingBottom: 1, paddingTop: 2}}>
                        <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                    </Box>
                    <h2>Sign in</h2>
                    <TextField label="Username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} required placeholder="Enter username..." fullWidth sx={{paddingBottom: 2}}></TextField>
                    <TextField label="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required placeholder="Enter password..." type="password" fullWidth></TextField>
                    <FormControlLabel
                        control={
                            <Checkbox name="checkBox" color="primary"/>
                        }
                        label="Remember Me"
                    />
                    <Button style={buttonStyle} type="submit" color="primary" fullWidth variant="contained"> Sign in </Button>
                    <Typography>
                        <Link to="#">
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography> Do you have an account?      
                        <Link to="#" style={{paddingLeft: 2}}>
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Box>

        </div>
    );

}

export default LoginPage;