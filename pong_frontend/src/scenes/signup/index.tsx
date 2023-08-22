
import { Button, Input, Avatar, Box, FormControlLabel, Paper, TextField, Checkbox, Typography, Alert, AlertTitle } from "@mui/material"
import { LockOutlined } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import React, { ReactElement, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface Input {
    input: string;
    errors: string[];
}

interface UserData {
    username: string;
    avatar: string;
    password: string;
}

interface postUserData {
    message: string;
    user: UserData;
}

const SignupPage = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState<Input>({ input: '', errors: []});
    const [password, setPassword] = useState<Input>({ input: '', errors: []});
    const [repeatedPassword, setRepeatedPassword] = useState<Input>({ input: '', errors: []});
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageError, setImageError] = useState<string>('');


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


    const displayInputErrors = (input: Input): ReactElement => {
        return (
            <Alert sx={{mb: 2}} onClose={() => {}} severity="error">
                {input.errors.map((error, index) => {
                    return error;
                })}
            </Alert>
        );
    }

    const validateUsername = async (name: string) => {
        const errors: string[] = [];

        if (name.length < 5)
            errors.push("Username must be at least 5 characters");
        else if (name.length > 20)
            errors.push("Username must be at smaller than 20 characters");
        if (name.includes(' '))
            errors.push("Username must not contain spaces");

        if (errors.length == 0)
        {
            try {
                const response = await axios.get(`/user/username/${name}`);
                if (response.status === 200)
                    errors.push("Username already exists");
            } catch (err) {
                console.log(err);
            }
        }
        setUsername({input: name, errors: errors});
    }

    const validatePassword = (pwd: string) => {
        const errors: string[] = [];

        const specialChars: RegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        !specialChars.test(pwd) || errors.push("Password must have at least one special character");
        pwd.length < 7 && errors.push("Password must have at least 7 characters");
        pwd.length > 50 && errors.push("Password must be smaller than 50 characters");
        !/[A-Z]/.test(pwd) || errors.push("Password must have at least a uppercase letter"); 

        setPassword({input: password.input, errors: errors});
    }


    const handleSignup = async (): Promise<void> => {
        
        setUsername({input: username.input, errors: []});
        setImageError('');
        setPassword({input: password.input, errors: []});
        setRepeatedPassword({input: repeatedPassword.input, errors: []});

        validateUsername(username.input);
        validatePassword(password.input);

        if (password.input !== repeatedPassword.input) {
            setRepeatedPassword({input: repeatedPassword.input, errors: ["Password doesn't match"]});
        }

        if (!selectedImage)
        {
            setImageError('Image not selected');
            return ;
        }
        if (username.errors.length === 0 && password.errors.length === 0 && repeatedPassword.errors.length === 0)
        {
            const formData = new FormData();
            formData.append('username', username.input);
            formData.append('password', password.input);
            formData.append('avatar', selectedImage);
            console.log(selectedImage);
            try {
                const response = await axios.post(`/user/python`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    console.log(response.data);
                    navigate('/login');
                } else if (response.status === 260) {
                    username.errors.push(response.data.message);   
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => setUsername({input: e.target.value, errors: username.errors});
    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword({input: e.target.value, errors: password.errors});
    const handleRepeatedPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setRepeatedPassword({input: e.target.value, errors: repeatedPassword.errors});
    const handleImageChange = (e: any) => setSelectedImage(e.target.files[0]);

    return (
        <div>
            <Box>
                <Paper elevation={10} style={paperStyle} >
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{paddingBottom: 1, paddingTop: 2}}>
                        <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                    </Box>
                    <h2>Sign in</h2>
                    <TextField 
                        label="Username"
                        onChange={handleUsernameInput}
                        required
                        placeholder="Enter username..."
                        fullWidth/>
                    {username.errors.length != 0 && displayInputErrors(username)}
                    <TextField 
                        label="Password"
                        onChange={handlePasswordInput}
                        required
                        placeholder="Enter password..."
                        type="password"
                        fullWidth/>
                    {password.errors.length != 0 && displayInputErrors(password)}
                    <TextField 
                        label="Repeat Password" 
                        onChange={handleRepeatedPasswordInput} 
                        required 
                        placeholder="Enter password above..." 
                        type="password" 
                        fullWidth/>
                    {repeatedPassword.errors.length != 0 && displayInputErrors(repeatedPassword)}
                    <Input type="file" onChange={handleImageChange} />
                    {imageError && 
                    <Alert style={{paddingBottom: 2}} onClose={() => {}} severity="error">
                        {imageError}
                    </Alert>}
                    <FormControlLabel control={ <Checkbox name="checkBox" color="primary"/> } label="Remember Me"/>
                    <Button 
                        style={buttonStyle}
                        type="submit"
                        color="primary"
                        onClick={handleSignup}
                        fullWidth
                        variant="contained"> 
                            Sign in 
                    </Button>
                    
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