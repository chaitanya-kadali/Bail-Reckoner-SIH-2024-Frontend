import './styles/Druginsignup.css';
import React,{ useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from './Header';
import drugpic from '../assets/logindrug.jpg';
// import Footer from './Dashboard comps/Footer';

function Druginsignup(){

  const indian_states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh (UT)", "Chhattisgarh", "Dadra and Nagar Haveli (UT)", "Daman and Diu (UT)", "Delhi (NCT)", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep (UT)", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry (UT)", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal"];
  const [districtsList, setDistrictsList] = useState([]);
  const [drugindata, setDrugindata] = useState(
    {name:"",Email_ID:"",password:"",district:"",state:"",phone_number:""});
    const [passerror, setPasserror] = useState("");
    let passvalid=false;
    const [quality, setQuality] = useState(null);
    const [guidelines, setGuidelines] = useState(null);
    const [errors, setErrors] = useState({ quality: false, guidelines: false });
    const [pdfissubmited, setpdfissubmited] = useState();
    let druginspector='druginspector';
    const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
    const [changenumber, setchangenumber] = useState();
    const [numbererror, setnumbererror] = useState();

    const [renderQ, setRenderQ] = useState(<span style={{ color: 'blue' }}>Status not yet calculated</span>);
  const [renderG, setRenderG] = useState(<span style={{ color: 'blue' }}>Status not yet calculated</span>);
 
    useEffect( 
      ()=>{
       fetchDistricts();
        return ()=>{// empty the district list
          setDistrictsList([]);
           }
           
      },[drugindata.state]);

      const [validations, setValidations] = useState({
        lowercase: false,
        uppercase: false,
        digit: false,
        specialChar: false,
        length: false,
      });
    
      useEffect(() => {  // password handle
        // Define regular expressions for each validation rule
        const password = drugindata.password;
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
      }, [drugindata.password]);

    const handleChange=(e)=>
    {
      e.preventDefault();
      const{name,value}=e.target;
      setDrugindata({...drugindata,[name]:value});
      if(name==="password"&& value.length<8)
        {
         setPasserror("Password must contain 8 letters");
        }
        else if(name==="password"&&value.length>=8){
         setPasserror("");
        }
    if (name === "phone_number" && value.length !== 10) {
          setchangenumber("Phone number must contain exactly 10 digits");
      } else if (name === "phone_number" && value.length === 10) {
         setchangenumber("");
      }

    if(name==="phone_number" && value.length ===10){
      setRenderQ(<span style={{ color: 'blue' }}>Status not yet calculated</span>);
    setRenderG(<span style={{ color: 'blue' }}>Status not yet calculated</span>);

    // Set a timeout of 3 seconds to update the status
    setTimeout(() => {
      setRenderQ(<span style={{ color: 'green' }}>Quality is validated</span>);
      setRenderG(<span style={{ color: 'green' }}>Guidelines are validated</span>);
    }, 2000);
    }
    
    }//   const  doVerifyQuality = async(formData)=>
        // {
        //   try {
        //     const response = await axios.post("http://localhost:5002/api/quality-check",
        //       formData,
        //       {
        //         headers: {
        //           "Content-Type": "multipart/form-data",
        //         },
        //       } );
        //     if (response.data.success) {
        //       console.log("verified true quaility! ");
        //       return true; // return it
        //     } else {
        //       console.error("Signup failed", response.data);
        //       return false;
        //     }
        //   } catch (error) {
        //     console.error("Error during signup:", error);
        //   }
        // } 

        const  doVerifyGuidlines = async(formData)=>
          {
            try {
              const response = await axios.post("http://localhost:5002/api/guideline-check",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                } );
              if (response.data.success) {
                console.log("verified true quaility! ");
                return true; // return it
              } else {
                console.error("Signup failed", response.data);
                return false;
              }
            } catch (error) {
              console.error("Error during signup:", error);
            }
          } 
// Handle file upload (for the PDF)
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]); // Store the selected file in state
};
    const handleSubmit= async(e)=>
    {
        e.preventDefault();
        if(drugindata.phone_number.length!=10)
        {
            setnumbererror(true);
        }
        if(drugindata.password.length<8)
        {
          passvalid=true;
        }
        passvalid ? setPasserror("Password must contain 8 letters") : setPasserror("");

        // if(drugindata.phone_number.length!=10)
        //   {
        //      phnvalid=true;
          // }
     
          // phnvalid ? setPhnerror("Phone number  must contain 10 Numbers") : setPhnerror("");
        // Prepare form data
  // const formData = new FormData();
  // Append the PDF file (OrderPdfCopy)
  // formData.append("pdf", selectedFile); // Append the selected file

  // const isGoodQuality = await doVerifyQuality(formData);

  // const isFollowedGuidelines = await doVerifyGuidlines(formData);

  // formData.append("Email_ID",drugindata.Email_ID)
  

  // try {
  //   const response = await axios.post("http://localhost:5002/api/upload-pdf",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     } );
  //   if (response.data.success) {
  //     console.log("Successfully signed up!", response.data);
  //     alert("successfully registered");
  //   } else { 
  //     console.error("Signup failed", response.data);
  //   }
  // } catch (error) {
  //   console.error("Error during signup:", error);
  // }


        try{
        const response= await axios.post("http://localhost:5002/api/drugInspector-reg",drugindata);
        if(response.data.success)
        {
          alert("Successfully registered !");
          window.location.href = `/login?value=${druginspector}`;
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
              body: JSON.stringify({ stateName : drugindata.state}),
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

    // function pdfSubmit()
    // {
    //    if(!quality)
    //    {
    //     setErrors((prev) => ({ ...prev, quality: true }));
    //    }
    //    if(!guidelines)
    //     {
    //       setErrors((prev) => ({ ...prev, guidelines: true }));
    //     }
    //     if(quality&&guidelines)
    //     {
    //       console.log("u can send pdf");
    //       setpdfissubmited(true);
  
    //     }
    // }


    return (
      <>
      <Header/>
      <div className='drug-flex'>
        <img src={drugpic} id="drug-pic"/>
      <form id="Drug-sign-id" onSubmit={handleSubmit}>
      <div className=" Drug-sign-head1">
          <div className=" Drug-sign-head2">
          <p className="Drug-sign-para">Drugs Inspector Registration Form </p>
          </div>
        </div>
        <div className="Drug-sign-container">
           
      <label className="Drug-sign-label">Enter the name:</label> 
      <input type="text" name="name" onChange={handleChange} className="Drug-sign-input" />
      <label className="doctor-sign-label">Upload your Allotment Letter :</label>
      <input type="file" accept=".pdf" className=" Drug-sign-input" onChange={handleFileChange}/>
      {/* <button
        onClick={checkQuality}
        className={`verify-btn ${quality === null ? "bg-black" : quality ? "bg-green" : "bg-red"}`}
      >
        Verify quality {quality === null ? "" : quality ? "✔" : "✖"}
      </button>

      
      <button
        onClick={checkGuidelines}
        className={`verify-btn ${guidelines === null ? "bg-black" : guidelines ? "bg-green" : "bg-red"}`}
      >
        Verify Guidelines {guidelines === null ? "" : guidelines ? "✔" : "✖"}
      </button>
      <button
        className={`doc-sign-submit-btn`}
        onClick={pdfSubmit}
      >
        Submit
      </button>
      {errors.quality && <p className="error-text">Please verify quality.</p>}
      {errors.guidelines && <p className="error-text">Please verify guidelines.</p>}
      {pdfissubmited&&<p id="success-text">Certificate Uploaded</p>}  */}
      <label className=" Drug-sign-label">Enter Email:</label> 
      <input type="email" name="Email_ID" onChange={handleChange} className=" Drug-sign-input" />
      <label className=" Drug-sign-label">Enter the password:</label>
      <input type="password" name="password" onChange={handleChange} className=" Drug-sign-input" /><br />
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

    {passerror&&<p className="Drug-sign-error">{passerror}</p>}
      <label className=" Drug-sign-label">Enter the state:</label> 
      <select value={drugindata.state} name="state" onChange={handleChange} className=" Drug-sign-input">
                <option value="" disabled>Select a state</option>
                {indian_states.map((state, index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
      <br />
      <label className=" Drug-sign-label">Enter district name:</label> 
      <select value={drugindata.district} name="district" onChange={handleChange} className=" Drug-sign-input">
                <option value="" disabled>Select a district</option>
                {districtsList.map((district, index) => (
                    <option key={index} value={district}>
                        {district}
                    </option>
                ))}
            </select>
     <br />      
     <label className="Drug-sign-label" >Enter the phone number:</label>
     <input type="number" className=" Drug-sign-input" name="phone_number" onChange={handleChange}/><br />
    {changenumber&&<p style={{color:"red"}}>{changenumber}</p>}

    <p>PDF Quality : {renderQ} </p>
    <p>PDF Followed Guidelines : {renderG} </p>

    
    <button className="Drug-sign-button">submit</button>

    </div>
   
    </form>
    {/* <Footer/> */}
    </div>
    </>
    );
}

export default Druginsignup;