import PrintList from './PrintList.jsx';
import React, { useEffect, useState } from 'react'
import '../styles/Filterdoctor.css';
import axios from 'axios';

export default function Filterdoctor({email}) {

  const [doctorData, setDoctorData] =useState([]);

  const Email_ID = email;
  useEffect( ()=>{
    const fetch_Doctors = async(e)=>{
      try {
          const response = await axios.post('http://localhost:5002/api/doctertab-in-startup', 
                                       {Email_ID});
          const doctersExist  = response.data.DoctorRetrievalSuccess;       
          if (doctersExist) {
              setDoctorData(response.data.DoctorsAvai);
          }
      } catch (error) {
          if (error.response) { // Server responded with a status code OUTSIDE of the 2xx range
              console.error("Error Response Data:", error.response.data);
              console.error("Error Response Status:", error.response.status);
          } else if (error.request) {// No response received from the server
              console.error("No response received:", error.request);
          } else { // Something went wrong setting up the request
              console.error("Request error:", error.message);
          }
      }
      
     }
      fetch_Doctors();
      return()=>{
          fetch_Doctors();   //deletion at  unmounting
      }
  },[]);

  const render=()=>{
    // console.log("data isssssssssssssssssssss : ",doctorData);
    if(doctorData.length===0){
      return<>
      <h1 className='no-f-datafound'> There are no Ayush Doctors in your District.</h1>
      </>
    }else{
      return <>
     { doctorData.length ===1  ?<h1>We found 1 Ayush docter in your district. </h1> :
                 <h1>There are {doctorData.length} Ayush docters in your district.</h1> }
       <br/>
      {doctorData.map((eachdocter,index) => (
          <PrintList  key={index} name1={eachdocter.name} phone1={eachdocter.phone_number} 
          district1= {eachdocter.district} usertype={"docter"} email={eachdocter.Email_ID} ></PrintList>
               ))
      }
      </>
    }
  }
  return (
    <div className='fil-doc-main'> 
    <p className='doctor-info'>Near By Ayush Doctors</p>
   
    {render()}
   </div>
  );
}