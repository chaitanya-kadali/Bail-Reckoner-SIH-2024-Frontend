import React, { useState, useEffect } from 'react';
import '../styles/PrintdrugList.css';
import axios from 'axios';

function PrintdrugList({ startupmails }) { 

  const [reload, setReload]=("");
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [basicStartupDetail, setBasicStartupDetail] = useState([]); // Store details as an array
  const [rejected, setrejected] = useState(false);
  const [feedback, setFeedback] = useState('');
  // Fetch details for a single startup
  const handleInputChange = (e) => {
    setFeedback(e.target.value);  // Update the feedback state as the user types
  };
  const fetchbasicdetails = async (email) => {
    try {
      console.log("Fetching details for: ", email);
      const response = await axios.post('http://localhost:5002/api/startup-basic', { Email_ID: email }); 
      if (response.data.success) {
        return response.data.basicdata; // Return the fetched details
      }
    } catch (error) {
      console.log("Error: ", error);
      return null; // Return null if there's an error 
    }
  };

  // Toggle the visibility of additional info
  const toggleDetails = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  // Fetch details for all emails and store in state
  const getDetailsAll = async () => {
    const allDetails = [];
    for (let eachobj of startupmails) {
      const details = await fetchbasicdetails(eachobj.Email_ID); // Fetch details for each email
      if (details) {
        allDetails.push(details); // Push fetched details into array
      }
    }
    setBasicStartupDetail(allDetails); // Set all fetched details in state
  };
  function rejectclick(e)
  {
    e.preventDefault();
    setrejected(true);
  
  
  }
  
const handleSubmit = async(presentmail) => {
  console.log(`Feedback Submitted: ${feedback} you can reject ${presentmail}`);

  setrejected(false);  // Hide the feedback form after submission
  setFeedback('');     // Optionally clear the feedback after submission

  try {
    const response = await axios.post('http://localhost:5002/api/make-it-rejected', { Email_ID: presentmail }); 
    if (response.data.success) {
      console.log("success rejected");
    }else{
      console.log("failure rejection");
    }
  } catch (error) {
    console.log("Error: ", error);
  }

  try {
    const response = await axios.post('http://localhost:5002/api/startup-feedback-post', { Email: presentmail , feedback:feedback }); 
    if (response.data.success) {
      console.log("successfully feedback sent");
    }else{
      console.log("failure feedback sending");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  window.location.reload();

};
 async function acceptstartup(presentmail)
  {
    console.log("you can assign drug inspector",presentmail);
    try {
      const response = await axios.post('http://localhost:5002/api/make-it-accepted', { Email_ID: presentmail }); 
      if (response.data.success) {
        console.log("success accepting");
      }else{
        console.log("failure accepting");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    window.location.reload();
  }
  // Fetch all startup details when component mounts
  useEffect(() => {
    getDetailsAll();
  }, [startupmails]);

  return (
    <div className="Drugp-container">
      {startupmails.map((eachemailobj, index) => {
        const details = basicStartupDetail[index]; // Fetch the details based on the index

        return (
          <div key={index} className="Drugp-item">
            <div
              onClick={() => toggleDetails(index)}
              className="Drugp-header"
            >
              <p className="Drugp-name"> 
                {details ? details.companyName : 'Loading...'} 
              </p>
              <p className="Drugp-email">
                {eachemailobj.Email_ID}
              </p>
            </div>

            {/* Render details if visible */}
            {visibleIndex === index && details && (
              <div className="Drugp-details">
                <div className='Drugp-details-inner'>
                  <div className='Drugp-details-b1'>
                    <p>Address: {details.address}</p>
                    <p>City: {details.city}</p>
                    <p>Pincode: {details.pinCode}</p>
                    <p>District: {details.district}</p>
                    <p>State: {details.state}</p>
                  </div>
                </div>
                <div className='Drugp-details-buttons'>
                  <button 
                    className='Drugp-btn-assign'
                    onClick={()=>{acceptstartup(eachemailobj.Email_ID)}}
                  >
                    Accept
                  </button>
                  <button className='Drugp-btn-reject' onClick={rejectclick}>
                    Reject
                  </button>
                  {rejected && (
            <><br/>
              <input 
                type='text' 
                name="feedback" 
                id="feedback-inp"
                placeholder='Enter feedback'
                value={feedback}  // Bind the input value to the feedback state
                onChange={handleInputChange}  // Update state when the input changes
              />
              <button onClick={()=>{handleSubmit(eachemailobj.Email_ID)}} id="feed-submit">Submit</button>
            </>
          )}
                </div>
              </div>
            )}
          </div>
        ); // Close return block for this item
      })} {/* Close the .map() function */}
    </div> // Close Drugp-container div
  );
} // Close PrintdrugList component

export default PrintdrugList;
