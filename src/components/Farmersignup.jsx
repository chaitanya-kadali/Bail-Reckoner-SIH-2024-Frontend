import './styles/Farmersignup.css';
import React,{ useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Dashboard comps/Footer';
import farmerpic from '../assets/loginfarmer.jpg';
function Farmersignup(){
  const indian_states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh (UT)", "Chhattisgarh", "Dadra and Nagar Haveli (UT)", "Daman and Diu (UT)", "Delhi (NCT)", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep (UT)", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry (UT)", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal"];
  const [districtsList, setDistrictsList] = useState([]);
  const [farmerdata, setFarmerdata] = useState(
    {name:"",phone_number:"",password:"",district:"",state:"",crop_name:"",language:"en"});
    const [passerror, setPasserror] = useState("");
    const [phnerror,setPhnerror]=useState("");
    let passvalid=false;
    let phnvalid=false;
    let farmer='farmer';
    useEffect( 
      ()=>{
       fetchDistricts();
        return ()=>{
          // empty the district list
          setDistrictsList([]);
           }
            
      },[farmerdata.state]);
      const [validations, setValidations] = useState({
        lowercase: false,
        uppercase: false,
        digit: false,
        specialChar: false,
        length: false,
      });
    
      useEffect(() => {  // password handle
        // Define regular expressions for each validation rule
        const password = farmerdata.password;
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
      }, [farmerdata.password]);
    const handleChange=(e)=>
    {
      e.preventDefault();
      const{name,value}=e.target;
      setFarmerdata({...farmerdata,[name]:value});
      if(name==="password"&& value.length<8)
        {
         setPasserror("Password must contain 8 letters");
        }
        else if(name==="password"&&value.length>=8){
         setPasserror("");
        }
        if (name === "phone_number" && value.length !== 10) {
          setPhnerror("Phone number must contain exactly 10 digits");
      } else if (name === "phone_number" && value.length === 10) {
          setPhnerror("");
      }
    }
    const handleSubmit= async(e)=>
    {
        e.preventDefault();
        if(farmerdata.password.length<8)
        {
          passvalid=true;
        }
        passvalid ? setPasserror("Password must contain 8 letters") : setPasserror("");
          if(farmerdata.phone_number.length!=10)
            {
               phnvalid=true;
            }
       
            phnvalid ? setPhnerror("Phone number  must contain 10 Numbers") : setPhnerror("");
        try{
        const response= await axios.post("http://localhost:5002/api/farmer-reg",farmerdata);
        if(response.data.success)
        {
          alert("Successfully Signed in!");
          window.location.href = `/login?value=${farmer}`;
        }
        else{
          alert("Please Try again")
        }
      }
      catch (error) {
       console.log(error);
    }
  }
   
   
    const fetchDistricts = async () => {
      try {
          const response = await fetch('http://localhost:5002/api/districts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ stateName : farmerdata.state}),
          });

          if (!response.ok) {
              throw new Error('State not found or other error');
          }

          const data = await response.json();
          setDistrictsList(data.districts);
      } catch (error) {
          console.error('Error fetching districts:', error);
      }
    }
  

    return (
      <>
      <Header/>
      <div className='farmer-flex'>
        <img src={farmerpic} id='farmer-login-pic'/>
      <form id="farmer-sign-id" onSubmit={handleSubmit}>
      <div className=" farmer-sign-head1">
          <div className=" farmer-sign-head2">
          <p className="farmer-sign-para">Farmer Registration Form</p>
          </div>
        </div>
        <div className="farmer-sign-container">
           
      <label className="farmer-sign-label">Enter the name:</label><br />
      <input type="text" name="name" onChange={handleChange} className="farmer-sign-input" /><br />
      <label className="farmer-sign-label">Enter the state:</label> 
      <select value={farmerdata.state} name="state" onChange={handleChange} className=" farmer-sign-input">
                <option value="" disabled>Select a state</option>
                {indian_states.map((state, index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
      <br />
      <label className=" farmer-sign-label">Enter district name:</label> 
      <select value={farmerdata.district} name="district" onChange={handleChange} className=" farmer-sign-input">
                <option value="" disabled>Select a district</option>
                {districtsList.map((district, index) => (
                    <option key={index} value={district}>
                        {district}
                    </option>
                ))}
            </select>
     <br />
      <label className=" farmer-sign-label">Enter crop name:</label> 
      <input type="text" name="crop_name" onChange={handleChange} className=" farmer-sign-input" /><br />
      <label className=" farmer-sign-label">Enter phone number:</label> 
      <input type="number" name="phone_number" onChange={handleChange} className=" farmer-sign-input" />
      {phnerror&&<p className="farmer-sign-error">{phnerror}</p>}
    
      <label className=" farmer-sign-label">Enter the password:</label>
      <input type="password" name="password" onChange={handleChange} className=" farmer-sign-input" /><br />
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
    {passerror&&<p className="farmer-sign-error">{passerror}</p>}
    <button className="farmer-sign-button">submit</button>
    </div>
   
    </form>
    </div>
    </>
    );
}

export default Farmersignup;