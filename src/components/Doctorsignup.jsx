import './styles/Doctorsignup.css';
import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Dashboard comps/Footer';
import doctorpic from '../assets/logindoctor.jpg';
function Doctorsignup() {
  const [doctordata, setDoctordata] = useState(
    {name:"",Email_ID:"",password:"",district:"",state:"",phone_number:"" });
    const [passerror, setPasserror] = useState("");
    const [pinerror,setPinerror]=useState("");
    const [phnerror,setPhnerror]=useState("");
   const [quality, setQuality] = useState(null);
   const [guidelines, setGuidelines] = useState(null);
   const [errors, setErrors] = useState({ quality: false, guidelines: false });
   const [pdfissubmited, setpdfissubmited] = useState();
    let result=true;
    let passvalid=false;
    let phnvalid=false;
    let pinvalid=false;
    let doctor='doctor';
  useEffect( 
    ()=>{
      fetchDistricts();
      return ()=>{
        // empty the district list
        setDistrictsList([]);
         }
    },[doctordata.state]);

    const [validations, setValidations] = useState({
      lowercase: false,
      uppercase: false,
      digit: false,
      specialChar: false,
      length: false,
    });
  
    useEffect(() => {  // password handle
      // Define regular expressions for each validation rule
      const password = doctordata.password;
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
    }, [doctordata.password]);
  const handelChange=(e)=>{
     e.preventDefault();
     const {name,value}=e.target;
     setDoctordata({...doctordata,[name]:value});
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

  const onSubmit =async(e)=>{
     e.preventDefault();
     if(doctordata.password.length<8)
     {
        passvalid=true;
     }
     passvalid ? setPasserror("Password must contain 8 letters") : setPasserror("");
      if(doctordata.phone_number.length!=10)
        {
           phnvalid=true;
        }
   
        phnvalid ? setPhnerror("Phone number  must contain 10 Numbers") : setPhnerror("");
     try{
     const response = await axios.post("http://localhost:5002/api/doctor-reg",doctordata);
     if(response.data.success)
     {
      alert("Successfully Signed Up");
      window.location.href = `/login?value=${doctor}`;
     }
     else{
      alert("please try again!");
     }
     }
     catch(error)
     {
      console.log("error is",error);
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
              body: JSON.stringify({ stateName : doctordata.state}),
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
  function checkQuality()
  {
     console.log("quality checking here");
    let response =true;
   setQuality(response);
   console.log("quality is",quality);
  }
  function checkGuidelines()
  {
    console.log("guidlines check here");
   let responses =true;
   console.log(responses);
  setGuidelines(responses);
  }
  function pdfSubmit()
  {
     if(!quality)
     {
      setErrors((prev) => ({ ...prev, quality: true }));
     }
     if(!guidelines)
      {
        setErrors((prev) => ({ ...prev, guidelines: true }));
      }
      if(quality&&guidelines)
      {
        console.log("u can send pdf");
        setpdfissubmited(true);

      }
  }
    return ( 
      <>
      <Header/>
      <div className='doctor-flex'>
        <img src={doctorpic} id="doctor-pic"/>
      <div id="doctor-sign-id"> 
      <div className=" doctor-sign-head1">
          <div className=" doctor-sign-head2">
          <p className="doctor-sign-para">Doctorsignup Details</p>
          </div>
        </div>
      <form onSubmit={onSubmit} className="doctor-sign-container">
       
         
      <label className="doctor-sign-label">Enter the name:</label>
      <input type="text" className="doctor-sign-input" name="name" onChange={handelChange}/><br />
      
      <label className=" doctor-sign-label">Enter the state:</label> 
      <select value={doctordata.state} name="state" onChange={handelChange} className=" doctor-sign-input">
                <option value="" disabled>Select a state</option>
                {indian_states.map((state, index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
      <br />
      <label className="doctor-sign-label">Enter district name:</label> 
      <select value={doctordata.district} name="district" onChange={handelChange} className=" doctor-sign-input">
                <option value="" disabled>Select a district</option>
                {districtsList.map((district, index) => (
                    <option key={index} value={district}>
                        {district}
                    </option>
                ))}
            </select>
     <br />
      
      <label className="doctor-sign-label" >Enter the phone number:</label>
      <input type="text" className=" doctor-sign-input" name="phone_number" onChange={handelChange}/><br />
      {phnerror&&<p className="doctor-sign-error">{phnerror}</p>}
      <label className="doctor-sign-label">Upload your University Docterate Certificate :</label>
      <input type="file" accept=".pdf" className=" doctor-sign-input" onChange={handelChange}/>
      <button
        onClick={checkQuality}
        className={`verify-btn ${quality === null ? "bg-black" : quality ? "bg-green" : "bg-red"}`}
      >
        Verify quality {quality === null ? "" : quality ? "✔" : "✖"}
      </button>

      {/* Verify Guidelines Button */}
      <button
        onClick={checkGuidelines}
        className={`verify-btn ${guidelines === null ? "bg-black" : guidelines ? "bg-green" : "bg-red"}`}
      >
        Verify Guidelines {guidelines === null ? "" : guidelines ? "✔" : "✖"}
      </button>
      <button
        className={`doc-sign-submit-btn`}
        // disabled={!(quality && guidelines)}
        onClick={pdfSubmit}
      >
        Submit
      </button>
      {errors.quality && <p className="error-text">Please verify quality.</p>}
      {errors.guidelines && <p className="error-text">Please verify guidelines.</p>}
      {pdfissubmited&&<p id="success-text">Certificate Uploaded</p>}
      <label className="doctor-sign-label">Enter the emailid:</label>
      <input type="email" className="doctor-sign-input" name="Email_ID" onChange={handelChange}/><br />
      <label className="doctor-sign-label">Enter the password:</label>
      <input type="password" className="doctor-sign-input" name="password" onChange={handelChange}/><br />

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
      
      {passerror&&<p className="doctor-sign-error">{passerror}</p>}
      <button className="doctor-sign-button">submit</button>
    </form>
    </div>
    </div>

    </>
    );
}

export default Doctorsignup;
