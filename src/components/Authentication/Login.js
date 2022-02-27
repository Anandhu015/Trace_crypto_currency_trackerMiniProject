import { Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';
const Login = ({handleClose}) => {
    const [email,setemail]=useState("");
    const [password,setPassword]=useState("");
    const {setAlert}=CryptoState();
    const handleSubmit=async ()=>{
      if(!email || !password){
        setAlert({
          open:true,
          message:"Please Fill all the fields",
          type:"error"
        })
      }
      try {
        const result=await signInWithEmailAndPassword(auth,email,password)
        setAlert({
          open:true,
          message:`Login Successful,Welcome ${result.user.email}`,
          type:"success"
        })
        handleClose()
      } catch (error) {
        setAlert({
          open:true,
          message:error.message,
          type:"error"
        })
      }
    }
  return(
    <Box p={3} style={{
        display:"flex",
        flexDirection:"column",
        gap:"20px"
    }}>
        <TextField 
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          fullWidth
          label="Enter Email"
        >

        </TextField>
        <TextField
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          label="Enter Password"
        >

        </TextField>
        <Button
          variant='outlined'
          size="large"
          style={{backgroundColor:"#EEBC1D"}}
          onClick={handleSubmit}
        >
            Login
        </Button>
    </Box>
      
  )
};

export default Login;
