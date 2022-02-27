import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const Signup = ({handleClose}) => {
    const [email,setemail]=useState("");
    const [Password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const {setAlert}=CryptoState();
    const handleSubmit= async()=>{
        if(Password!==confirmPassword){
            setAlert({open:true,
            message:"Passwords do not match",
            type:"error"})
            return;
        }
        try {
            const result=await createUserWithEmailAndPassword(auth,email,Password)
        setAlert({
          open:true,
          message:`Sign Up Successful,Welcome ${result.user.email}`,
          type:"success"
        })
        handleClose()
        } catch (error) {

          setAlert({
            open:true,
            message:error.message,
            type:"error",
          });
          return
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
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="Enter Password"
          >

          </TextField>
          <TextField
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            label="Confirm Password"
          >

          </TextField>
          <Button
            variant='outlined'
            size="large"
            style={{backgroundColor:"#EEBC1D"}}
            onClick={handleSubmit}
          >
              Sign Up
          </Button>
      </Box>
  )
};

export default Signup;
