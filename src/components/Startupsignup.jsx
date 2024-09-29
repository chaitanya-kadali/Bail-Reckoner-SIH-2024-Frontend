import './styles/Startupsignup.css';

import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Dashboard comps/Footer';
import startuppic from '../assets/loginstartup.jpg';
function Startupsignup() {
  const [startUpdata, setStartUpdata] = useState(
    {Email_ID:"",password:"",companyName : "",address : "",city:"",pinCode:null,
      state:"",district:"",phone_number:null });

  const [pinerror,setPinerror]=useState("");
  const [phnerror,setPhnerror]=useState("");
  let passvalid=false;
  let phnvalid=false;
  let pinvalid=false;
  
  const [validations, setValidations] = useState({
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
    length: false,
  });

  useEffect( 
    ()=>{
      fetchDistricts();
      return ()=>{
        // empty the district list
        setDistrictsList([]);
         }
    },[startUpdata.state]);
  
    useEffect(() => {
      // Define regular expressions for each validation rule
      const password = startUpdata.password;
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasValidLength = password.length >= 8 && password.length <= 30;
  
      // Update validation states based on regex tests
      setValidations({
        lowercase: hasLowercase,
        uppercase: hasUppercase,
        digit: hasDigit,
        specialChar: hasSpecialChar,
        length: hasValidLength,
      });
    }, [startUpdata.password]);

    const handelChange=(e)=>{
     e.preventDefault();
     const {name,value}=e.target;
     setStartUpdata({...startUpdata,[name]:value});
     
      if (name === "phone_number" && value.length !== 10) {
        setPhnerror("Phone number must contain exactly 10 digits");
    } else if (name === "phone_number" && value.length === 10) {
        setPhnerror("");
    }
      if(name==="pinCode"&& value.length<6)
      {
        setPinerror("pin number must contains 6 number ");
      }
      else if(name==="pinCode"&& value.length>=6)
        {
          setPinerror("");
        }
      

  }

  const onSubmit =async(e)=>{
     e.preventDefault();
     if(startUpdata.password.length<8){
        passvalid=true;
     }
     if(startUpdata.pinCode.length<6){
         pinvalid=true;
      }
      pinvalid ? setPinerror("Pincode  must contain 6 letters") : setPinerror("");
    if(startUpdata.phone_number.length!=10)  {
           phnvalid=true;
      }
  phnvalid ? setPhnerror("Phone nuber  must contain 10 Numbers") : setPhnerror("");
  try {
    const response = await axios.post("http://localhost:5002/api/startup-reg", startUpdata);
  
    if (response.data.success) {
      alert("Successfully Signed Up");
      window.location.href = `/login?value=${'startup'}`;
    } else {
      alert("Invalid Details. Please try again!");
      throw response;
    }
  
  } catch (resp) {
    if (resp.response && resp.response.data) { // Logging the actual error message from the response
      alert("Message: " + resp.response.data.message);
    } else { // Fallback if the response doesn't contain the expected data
      alert("An error occurred at backend. Server might be down.");
    }
    console.log("Error is", resp); // Log the full error object for debugging
  }


  }

  const indian_states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh (UT)", "Chhattisgarh", "Dadra and Nagar Haveli (UT)", "Daman and Diu (UT)", "Delhi (NCT)", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep (UT)", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry (UT)", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal"];
    const [districtsList, setDistrictsList] = useState([]);
    
  const fetchDistricts = async () => {
      try {
          const response = await fetch('http://localhost:5002/api/districts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ stateName : startUpdata.state}),
          });

          if (!response.ok) {
              throw new Error('State not found or other error');
          }

          const data = await response.json();
          setDistrictsList(data.districts);
      } catch (error) {
          console.error('Error fetching districts:', error);
      }
  };

    return ( 
      <>
      <Header/>
      <div className='start-flex'>
        <img src={startuppic} id='start-pic-id'/>
      <form id="startup-form" onSubmit={onSubmit}>
        <div className="start-up-head1">
          <div className="start-up-head2">
          <p className="start-up-para">Startup Registration Form</p>
          </div>
        </div>
      
        <div className="start-up-container">
         
      <label className="start-up-label">Name of the Company/Firm :</label>
      <input type="text" className="start-up-input" name="companyName" onChange={handelChange}/><br />
      
      <label className=" start-up-label">State :</label> 
      <select value={startUpdata.state} name="state" onChange={handelChange} className=" start-up-input">
                <option value="" disabled>Select a state</option>
                {indian_states.map((state, index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
      <br />
      <label className=" start-up-label">District :</label> 
      <select value={startUpdata.district} name="district" onChange={handelChange} className="start-up-input">
                <option value="" disabled>Select a district</option>
                {districtsList.map((district, index) => (
                    <option key={index} value={district}>
                        {district}
                    </option>
                ))}
            </select>
     <br />
     <label className=" start-up-label">Address :</label>
     <input type="text" className=" start-up-input" name="address" onChange={handelChange}/><br />
     <label className=" start-up-label">City :</label>
      <input type="text" className=" start-up-input" name="city" onChange={handelChange}/><br />

      <label className=" start-up-label">PinCode :</label>
      <input type="number" className=" start-up-input" name="pinCode" onChange={handelChange}/><br />
      {pinerror&&<p className="invaliderror">{pinerror}</p>}
      
      <label className=" start-up-label" >Contact number:</label>
      <input type="number" className=" start-up-input" name="phone_number" onChange={handelChange}/><br />
      {phnerror&&<p className="invaliderror">{phnerror}</p>}
      
      <label className=" start-up-label">Email Address :</label>
      <input type="email" className=" start-up-input" name="Email_ID" onChange={handelChange}/><br />
      <label className=" start-up-label">Password:</label>
      <input type="password" className=" start-up-input" name="password" onChange={handelChange}/><br />
      
      <ul className="password-checklist">
        <li className={validations.lowercase ? "valid" : "invalid"}>
          At least one lowercase letter
        </li>
        <li className={validations.uppercase ? "valid" : "invalid"}>
          At least one uppercase letter
        </li>
        <li className={validations.digit ? "valid" : "invalid"}>
          At least one digit
        </li>
        <li className={validations.specialChar ? "valid" : "invalid"}>
          At least one special character from the set
        </li>
        <li className={validations.length ? "valid" : "invalid"}>
          Be between 8 and 30 characters long
        </li>
      </ul>

      <button className="start-up-button">submit</button>
    </div>
   
    </form>
    </div>
    </>
    );
}

export default Startupsignup;
