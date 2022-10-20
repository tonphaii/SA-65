import React from 'react'
import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import frame from '../image/frame.svg'
import logo from '../image/logo.png'

import './signin.css'

import { SigninInterface } from './../../modules/ISingin'

export default function Signin() {

    const [success, setSuccess] = React.useState<boolean>(false)
    const [error, setError] = React.useState<boolean>(false)

    const [signin, setSignin] = React.useState<Partial<SigninInterface>>({})

    const handleClose: any = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };


    //function change state handle when typing 

    const handleInputChange = (event : React.ChangeEvent<{id?:string; value: any}>) => {
        const id = event.target.id as keyof typeof signin; //id will collect attribute key event
        const { value } = event.target; //value will collect value attribute
        
        setSignin({...signin, [id]: value})
    }

    const login = () => {
        const apiUrl = "http://localhost:8080/signin";
        const requestOptions : any = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signin)
        }

        fetch(apiUrl, requestOptions)
        .then((res) => res.json())
        .then((res) =>{
            if(res.data){
                setSuccess(true);
                // console.log(res.data)
                localStorage.setItem("token",res.data.Token)
                localStorage.setItem("uid",res.data.user_id)
                localStorage.setItem("role",res.data.role_name)
                window.location.reload()
            }else{
                setError(true)
            }
        })
    }

    return (
        <Box sx={{ display: "flex" }}>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    เข้าสู่ระบบสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    อีเมลหรือรหัสผ่านไม่ถูกต้อง
                </Alert>
            </Snackbar>

            <div className='from-box'>
                <img
                    style={{ maxHeight: "100vh" }}
                    className="img-box"
                    alt="Banner"
                    src={frame}
                />

                <div id='from-page' className='form-page'>
                    <div id='from-frame' className='from-frame'>
                        <div id="logo" className='logo'>
                            <img className="img" alt="logo" src={logo} />
                        </div>
                        <form noValidate className='form-in'>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={signin.username || ""}
                                onChange={handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={signin.password || ""}
                                onChange={handleInputChange}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: "#148F77", color: "#F4F6F6" }}
                                className='submit'
                                onClick={login}>
                                Sign In
                            </Button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </Box>
    )
}
