import React,{useEffect, useState} from 'react'
import Filterstartup from './Filterstartup';
import '../styles/Farmerdash.css';
import Header from '../Header';
import { useLocation } from 'react-router-dom';
export default function Doctordash() {
  const params= useLocation();
  let values=new URLSearchParams(params.search);
  const [tokenvalidation, settokenvalidation] = useState();
  let phno= values.get('phno');
  console.log("phone number is ",phno)
  let token= values.get('token');
  useEffect(()=>{
    const fecthit = async(e)=>{
        try{
        const response= await axios.post('',phno,token);
        if(response.data.success)
        {

        }
        else{
            settokenvalidation(false);
        }
        }
        catch(error)
        {

        }
        fecthit();

    }
   },[]);
         if(tokenvalidation==false || phno===null ){
    return(<h1 style={{textAlign:'center'}}>Error 404</h1>)
   }
  return (
    <>
    <Header/>
    <p className='farmer-dash-head'>Farmer Dashboard</p>
    <Filterstartup name={'farmer'} email={phno}/>
    </>
  )
}
