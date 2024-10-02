import React, { useState, useEffect } from 'react';
import '../styles/StartupApplication.css';
import axios from 'axios';

function StartupSingup({ email }) {

  const cn_email = email || "not passed";

  const [startupdata, setStartupdata] = useState({
    caseno:"FIR123456",charges:"Section 420 IPC (Cheating)",
    courtname:"District Court, Delhi",Dateofarrest:"2023-08-15",groundsforbail:"First-time offender, sole breadwinner of family." });
  const [originalData, setOriginalData] = useState({});
  const [editing, setEditing] = useState();
  const [userExists, setUserExists] = useState(false); // Flag to track if the user data exists

  // Captcha handling
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const [panError, setPanError] = useState('');
  const [gstError, setGstError] = useState('');

  useEffect(() => { // load user data
    generateCaptcha();
    // Fetch user data on mount if it exists
    const fetchUserData = async () => {
      try {
        const Email_ID = email;
        const response = await axios.post('http://localhost:5002/api/startup-dash-retrieval', { Email_ID });
        if (response.data.success) {
          const fetchedData ={...response.data.data}[0];  // 4d thinking
          // Ensure all fields are populated properly
          setStartupdata({
            Email: fetchedData.Email || "",
            PANno: fetchedData.PANno || "",
            GSTno: fetchedData.GSTno || "",
            websiteAddress: fetchedData.websiteAddress || "",
            certificateNo: fetchedData.certificateNo || "",
            CompanyDOI: fetchedData.CompanyDOI || "",
            IssuuingAuthority: fetchedData.IssuuingAuthority || "",
            IE_code: fetchedData.IE_code || "",
            IE_DOI: fetchedData.IE_DOI || "",
          });

          setOriginalData({
            Email: fetchedData.Email || "",
            PANno: fetchedData.PANno || "",
            GSTno: fetchedData.GSTno || "",
            websiteAddress: fetchedData.websiteAddress || "",
            certificateNo: fetchedData.certificateNo || "",
            CompanyDOI: fetchedData.CompanyDOI || "",
            IssuuingAuthority: fetchedData.IssuuingAuthority || "",
            IE_code: fetchedData.IE_code || "",
            IE_DOI: fetchedData.IE_DOI || "",
          }); // Store original data to COMPARE LATER
          setUserExists(true); // Set flag to indicate that user data exists
          setEditing(false);
        } else {
          setUserExists(false);
          setEditing(true);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [email]);

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStartupdata({ ...startupdata, [name]: value });
  };

  // Captcha and validation methods
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const captchaLength = 6;
    let randomCaptcha = '';
    for (let i = 0; i < captchaLength; i++) {
      randomCaptcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(randomCaptcha);
  };

  const handleCaptchaChange = (event) => setUserCaptcha(event.target.value);
  const validateCaptcha = () => userCaptcha === captcha ? true : setCaptchaError('Invalid captcha');
  const validatePAN = (PANno) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(PANno);
  const validateGST = (GSTno) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(GSTno);

  // Edit mode toggle
  // const editit = () => setEditing(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (!validatePAN(startupdata.PANno)) {
      setPanError('Invalid PAN format.');
      isValid = false;
    } else {
      setPanError('');
    }

    if (!validateGST(startupdata.GSTno)) {
      setGstError('Invalid GST format.');
      isValid = false;
    } else {
      setGstError('');
    }

    if (!validateCaptcha()) {
      isValid = false;
      // alert("Invalid Captcha");
    }

    if (isValid) {
      try {
            if (userExists) {
                    // Update method: Send only changed fields using PUT
                      const updatedFields = {};
                      Object.keys(startupdata).forEach((key) => {
                        if (startupdata[key] !== originalData[key]) {
                          updatedFields[key] = startupdata[key];
                        }
                      });
                      if (Object.keys(updatedFields).length > 0) {
                        const response = await axios.put(`http://localhost:5002/api/update-fill-application/${email}`, updatedFields);
                        if (response.data.success) {
                            alert('Data updated successfully!');
                          }
                      } else {
                        alert('No changes detected.');
                      }

              } else {
                      // Create and POST for new user data
                      const response = await axios.post('http://localhost:5002/api/startup-dash-post-fillapplication', startupdata);
                      if (response.data.success) {
                        alert('Successfully Filled the application');
                      } else {
                        alert('Error in submission. Please try again.');
                      }
              }
              window.location.reload();
      } catch (error) {
        console.log('Error in form submission:', error);
      }
  } else {
    console.log('Form is not valid');
  }
};

function makeiteditable(){
  setEditing(true);
  console.log("changed to edit");
}

    return (
        <>
        <div className="container-application">
            <div className="header">
                <p style={{color : 'rgb(6, 6, 87)', fontSize:'2rem'}}>Applicantion Form</p>
            </div>
             {/* {userExists ? <p style={{color:"green",fontSize:"0.9rem"}}>You have already submitted the data.<br/>You can edit now</p>
                         : <p style={{color:"red",fontSize:"0.9rem"}}>You haven't submitted the form yet. Please fill the details.</p> } */}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label style={{fontSize:'1.5rem'}} >Case Details</label>
                   
                </div>
                <div className="form-group">
                    <label>(a) Case No.</label>
                    <input type="text"readOnly={!editing} name="caseno" value={startupdata.caseno||""} onChange={handleChange} placeholder="Enter the Case No"/>
                </div>
                <div className="form-group">
                    <label>(b)Charges</label>
                    <input type="text"readOnly={!editing} name="charges" value={startupdata.charges||""} onChange={handleChange} placeholder="Enter Charges"/>
                </div>
                <div  className="form-group">
                    <label>(c)CourtName</label>
                    <input type="text" readOnly={!editing}name="courtname" value={startupdata.courtname ||""}onChange={handleChange} placeholder="Enter the court name" />
                    </div>
                <div className="form-group">
                    <label>(a)Date of Arrest</label>
                    <input type="date" readOnly={!editing} name="Dateofarrest" value={startupdata.Dateofarrest||""} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>(b)Grounds for Bail</label>
                    <input type="text" name="groundsforbail" readOnly={!editing} value={startupdata.groundsforbail ||""} onChange={handleChange} placeholder="Enter Grounds for bail"/>
                </div>
               
                <div>
                    <label id="ll32">Captcha</label><br/>
                  <span id="captcha">{captcha}</span><br/>
                  <button id="captcha-regenerate" onClick={generateCaptcha}>Regenerate</button>
                  <input id="li20" type="text" placeholder="Enter captcha" value={userCaptcha} onChange={handleCaptchaChange} />
                  {captchaError && <p className="error">{captchaError}</p>}       
                </div>
                <br/>

                <button className={`edit-button ${editing ? "editable" : ""}`} 
                    disabled={!userExists}
                    onClick={makeiteditable}
                    >Edit</button><br/><br/>
      
               <button type="submit">Submit</button>
            </form>
      
        </div>
        </>
    );
}

export default StartupSingup;