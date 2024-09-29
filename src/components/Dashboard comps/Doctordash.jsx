import React,{useEffect} from 'react'
import Filterstartup from './Filterstartup';
import '../styles/Doctordash.css'
import Header from '../Header';
import { useLocation } from 'react-router-dom';
import Logout from './Logout';
export default function Doctordash() {
  const params= useLocation();
  let values=new URLSearchParams(params.search);
  let email= values.get('email');
  let token= values.get('token');
  useEffect(()=>{
    const fecthit = async(e)=>{
        try{
        const response= await axios.post('',email,token);
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
         //    if(tokenvalidation==false){
//     return(<p>Error 404</p>)
//    }
  return (
    <>
    <Header/>
    <div className='doc-dash-main'>
      <div className='doc-dash-doc'>  
    <pre className='doctor-dash-head'>           Doctor Dashboard</pre>
    </div> 
    <div>
    <Logout/>
    </div>
    </div>
    <Filterstartup name={'doctor'} email={email}/>
    </>
  )
}
