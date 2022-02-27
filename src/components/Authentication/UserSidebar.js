import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@material-ui/core';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
const useStyles = makeStyles({
 container:{
     width:350,
     padding:25,
     height:"100%",
     display:"flex",
     flexDirection:"column",
     fontFamily:"monospace"
 },
 profile:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:"20px",
    height:"92%"

},
picture:{
    gap:"20px",
    width:200,
    height:200,
    cursor:"pointer",
    backgroundColor:"#EEBC1D",
    objectFit:"contain"
},
logout:{
    height:"8%",
    width:"100%",
    backgroundColor:"#EEBC1D",
    marginTop:20,
},
watchlist:{
    flex:1,
    width:"100%",
    backgroundColor:"grey",
    borderRadius:10,
    padding:15,
    paddingtop:10,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:12,
    overflow:"scroll"
}
});


export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({

    right: false,
  });
  const {user,setAlert,watchlist,coins}=CryptoState();
  
 
  console.log("watchlist",watchlist)
  console.log(coins)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });

  };
  const logout=()=>{
    signOut(auth);
    setAlert({
        open:true,
        type:"success",
        message:"Log Out Sucessfully"
    })
  
}
  return (
   
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor,true)}
          ></Avatar>
          <Drawer 
            anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}
            style={{
                height:38,
                width:38,
                cursor:"pointer",
                backgroundColor:"#EEBC1D"
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          >
            <div className={classes.container}>
                <div className={classes.profile}>
                    <Avatar
                        className={classes.picture}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <span 
                        style={{
                            width:"100%",
                            fontSize:18,
                            textAlign:"center",
                            fontWeight:"bolder",
                            wordWrap:"break-word",
                        }}>
                            {user.displayName || user.email}
                    </span>
                    <div className={classes.watchlist}>
                        <span style={{fontSize:15,textShadow:"0 0 5px black"}}>
                            Watchlist
                        </span>
                        <div>
                      
                          </div>
      
                
                      
                    </div>
                    </div>
      
                    <Button
                        variant='contained'
                        className={classes.logout}
                        onClick={logout}
                    >
                        log Out
                    </Button>
                </div>
          </Drawer>
        </React.Fragment>
      
      ))}
      
    </div>
     
  );
}