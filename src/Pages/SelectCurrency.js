
import React,{ useEffect, useState} from 'react'
import "../index.scss"
import {
  Form,
  FormGroup,
  Select,
  SelectItem,
  Button,
  Loading
} from "carbon-components-react"
import { coinPair } from '../util'
import { Line } from "react-chartjs-2";
import {makeStyles} from "@material-ui/core/styles";
import moment from 'moment'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';


const SelectCurrency = () => {
    const [coin,setCoinpair]=useState("BTC-USD");
    const [data,setData]=useState([{}])
    const [prediction,setPrediction]=useState([])
    const [isLoading,setloading]=useState(false)
 
    const useStyles=makeStyles((theme) => ({
      container:{
        width: "50%",
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        marginTop:60,
        marginLeft:380,
        padding:50
      }
    }))
    const classes=useStyles()
    
 
    const runPred=async (coin)=>{
        // create a new XMLHttpRequest
        var data ="/predict?selectcur="+coin;
        setloading(true)
        console.log(coin)
        const res=await axios.get(data).then(res=> setPrediction(res.data))
        console.log(prediction)
        setloading(false)

       
    }
    
    const data1 = {
      datasets: [
        {
          label: "predictions",
          data: prediction,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(255,223,0)"
        
        },
        
      ]
    };
    return (
    <div className='mainContainer'>
    <h1>Select Coin Pair</h1>
    <Form>
      <FormGroup typeof='multipart/form-data'>
        <Select style={{width:500,marginLeft:"auto",marginRight:"auto"}}  id="selectcur" labelText="Select Coin Pair"
         onChange={(e)=>{ setCoinpair(e.target.value);
        }}
        >
          {coinPair.map((coinvalue=>(<SelectItem text={coinvalue} value={coinvalue}/>)))}</Select>
      </FormGroup>
      
     <Button onClick={(e)=>{runPred(coin)}}disabled={isLoading}
      variant='outlined'
      size="large"
      style={{backgroundColor:"#EEBC1D",color:"black",borderRadius:20,}}
      titleStyle={{fontSize:20}}>{isLoading && (
       <Loading description='Loading your predictions...'
      />)}predict</Button>
      
    </Form>
    <div className={classes.container}>
     {prediction.length === 0 ?" ": <Line data={data1}  />}
    </div>
    
   
  </div>

  )
}

export default SelectCurrency