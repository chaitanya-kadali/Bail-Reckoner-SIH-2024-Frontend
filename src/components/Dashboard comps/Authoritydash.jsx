import React,{useState,useEffect} from 'react';
import Authorityhome from './Authorityhome';
import Authoritynotification from './Authoritynotfication';
import Header from '../Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Authoritydash.css';
import Footer from './Footer';
import Logout from './Logout';
import Authendicatedrug from './Authendicatedrug';

export default function Authoritydash() {
     const [drugtab, Setdrugtab] = useState(1);
     const params= useLocation();
     const [tokenvalidation, settokenvalidation] = useState();
   let values=new URLSearchParams(params.search);
   let decemail= values.get('email');
   let email= atob(decemail);
   let token= values.get('token');

   useEffect(()=>{     // parsing the token
     const fetch_it = async(e)=>{
      try {
        const response = await axios.post('http://localhost:5002/api/tokenverify', 
            {email}, { // parsing the token as a JSON file
                        headers: {
                            'authorization': `Bearer ${token}`, 
                            'Content-Type': 'application/json',
                        } 
                    }
        );
        const tokenSuccess  = response.data.tokenSuccess;
        settokenvalidation(tokenSuccess);        
        if (tokenSuccess) {
            console.log("Token success:", tokenSuccess);
            
        } else if(tokenSuccess===false){
            alert("token is false.. invalid entry into the portal");
            settokenvalidation(false);
            // block the whole website down
        }else {
            console.log("TokenSuccess variable itself is not recieved from the Backend RESPONSE.");
        }
    } catch (error) {

        if (error.response) {
            // Server responded with a status code OUTSIDE of the 2xx range
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
        } else if (error.request) {
            // No response received from the server
            console.error("No response received:", error.request);
        } else {
            // Something went wrong setting up the request
            console.error("Request error:", error.message);
        }
    }
    
  }
    fetch_it();
   
    return()=>{
        fetch_it();
    }
},[]);

//       if(tokenvalidation==false){
//     return(<p>Error 404</p>)
//    }
    function gohome()
    {
        Setdrugtab(1);
    }
    function gonotification()
    {
        Setdrugtab(2);
    }
    function goauthendicate()
    {
        Setdrugtab(3);
    }
  return (
    <>
    <Header/>
    <div id="authority-dash-id"> 
    <p className='drug-head'>Licensing Authority Dashboard</p>
    <div className='drug-main'>
        <div className='drug-main-first'>
        <p className="drug-nav" onClick={gohome}>Home</p>
        <p className="drug-nav" onClick={gonotification}>Notifications</p>
        <p className="drug-nav" onClick={goauthendicate}>Authendicate Drug Inscpector</p>
        </div>
        <div>
        <Logout/> 
        </div>
    </div>
    </div>
   {
     drugtab === 1 ? (<Authorityhome email={email}/>) : drugtab === 2 ? (<Authoritynotification email={email}/>) :
     drugtab === 3 ? (<Authendicatedrug email={email}/>) : (null)
   }
   <Footer/>
    </>
  )
}
