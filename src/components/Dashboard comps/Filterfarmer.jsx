import React,{useState, useEffect} from 'react';
import axios from 'axios';
import PrintList from './PrintList.jsx';

import '../styles/Filterfarmer.css';

export default function Filterfarmer({email}) {
  const [farmerDataList, setfarmerDataList] = useState([]); // initializing with empty list (expecting no farmers in the district)
  const Email_ID =email;
  console.log(Email_ID);
  
  useEffect(()=>{  
    const fetch_Farmers = async(e)=>{
      try {
          const response = await axios.post('http://localhost:5002/api/farmertab-in-startup', 
                                       {Email_ID});
          const farmersExist  = response.data.farmerRetrievalSuccess;       
          if (farmersExist) {
              console.log("farmers exists ");
              setfarmerDataList(response.data.Farmerslist);
              console.log("data is : ",farmerDataList);
              
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
      fetch_Farmers();
      return()=>{
          fetch_Farmers();   //deletion at  unmounting
      }
  },[]);
const render=()=>{
  console.log("data isssssssssssssssssssss : ",farmerDataList);
  if(farmerDataList.length===0){
    
    return<>
    <h1 className='no-f-datafound'> There are no Ayush farmers in your District</h1>
    </>
  }else{
    return <>
   { farmerDataList.length ===1  ?<h1>We found 1 Ayush Farmer in your district </h1> :
               <h1>There are {farmerDataList.length} Ayush farmers in your district</h1> }
     <br/>
    {farmerDataList.map((eachfarmer,index) => (
        <PrintList  key={index} name1={eachfarmer.name} phone1={eachfarmer.phone_number} 
        district1= {eachfarmer.district} usertype={"farmer"} cropname={eachfarmer.crop_name} ></PrintList>
             ))
    }
    </>
  }
}
  return (
    <> 
    <p className='farmer-info'>Farmers Info</p>
   
    {render()}
    </>
  );
}
