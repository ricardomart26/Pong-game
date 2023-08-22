
import { Button, Input, Avatar, Box, FormControlLabel, Paper, TextField, Checkbox, Typography, Alert, AlertTitle } from "@mui/material"
import { LockOutlined } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Input {
    input: string;
    errors: string[];
}


const SignupPage = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState<Input>({ input: '', errors: []});
    const [password, setPassword] = useState<Input>({ input: '', errors: []});
    const [repeatedPassword, setRepeatedPassword] = useState<Input>({ input: '', errors: []});
    // const [inputError, setInputError] = useState<Input>();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event: any) => {
      const imageFile = event.target.files[0];
      setSelectedImage(imageFile);
    };

    const paperStyle = {
        padding: 20,
        height: '60vh',
        width: 370,
    };

    const avatarStyle = {
        backgroundColor: '#1bbd7e',
    };

    const buttonStyle = {
        marginBottom: 8,
    };


    const verifyInputErrors = (input: Input) => {
        if (input.errors.length > 0) {
            return (
                <Alert style={{paddingBottom: 2}} onClose={() => {}} severity="error">
                    {/* <AlertTitle>Login Error</AlertTitle> */}
                    {input.errors.map((error, index) => {
                        return <div key={index}>{error}</div>;
                    })}
                </Alert>
            );
        }
        return <div style={{paddingBottom: 2}}></div>;
    }


    const validateUsername = async (name: string) => {
        const errors: string[] = [];

        if (name.length < 5)
            errors.push("Username must be at least 5 characters");
        else if (name.length > 20)
            errors.push("Username must be at smaller than 20 characters");
        if (name.includes(' '))
            errors.push("Username must not contain spaces");

        // if (errors.length > 0)
        //     return ;
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/username/${name}`);
            if (response.status === 200)
                errors.push("Username already exists");
        } catch (err) {
            console.log(err);
        }

        setUsername({input: name, errors: errors});
    }

    const validatePassword = (password: string) => {

    }

    const validateRepeatedPassword = (repeatedPassword: string) => {
        
    }
    
    

    const handleSignup = (e: React.MouseEvent) => {
        
        setUsername({input: username.input, errors: []});
        setPassword({input: password.input, errors: []});
        setRepeatedPassword({input: repeatedPassword.input, errors: []});

        validateUsername(username.input);
        console.log(username.errors);
        validatePassword(password.input);
        validateRepeatedPassword(repeatedPassword.input);


        if (username.errors.length === 0 && password.errors.length === 0 && repeatedPassword.errors.length === 0)
        {
            const formData = new FormData();
            formData.append('username', username.input);
            formData.append('password', password.input);
            if (selectedImage)
                formData.append('avatar', selectedImage);
            
            try {

                axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/python`, formData, {headers: {
                    'Content-Type': 'multipart/form-data',
                  }});
                navigate('/login');
            }
            catch (err) {
                console.log(err);       
            }
        }
        else 
            console.log('error');

    };

    return (
        <div>
            <Box>
                <Paper elevation={10} style={paperStyle} >
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{paddingBottom: 1, paddingTop: 2}}>
                        <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                    </Box>
                    <h2>Sign in</h2>
                    <TextField label="Username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername({input: e.target.value, errors: username.errors})} required placeholder="Enter username..." fullWidth></TextField>
                    {verifyInputErrors(username)}
                    <TextField label="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword({input: e.target.value, errors: password.errors})} required placeholder="Enter password..." type="password" fullWidth></TextField>
                    {verifyInputErrors(password)}
                    <TextField label="Repeat Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatedPassword({input: e.target.value, errors: repeatedPassword.errors})} required placeholder="Enter password above..." type="password" fullWidth></TextField>
                    {verifyInputErrors(repeatedPassword)}
                    <Input type="file" onChange={handleImageChange} />
                    <FormControlLabel
                        control={
                            <Checkbox name="checkBox" color="primary"/>
                        }
                        label="Remember Me"
                    />
                    <Button style={buttonStyle} type="submit" color="primary" onClick={handleSignup} fullWidth variant="contained"> Sign in </Button>
                    <Typography>
                        <Link to="#">
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography> Do you have an account?
                        <Link to="/login" style={{paddingLeft: 2}}>
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Box>

        </div>
    );

}

export default SignupPage;