import React, { useEffect, useState } from 'react';
import '../styles/PrintauthorList.css'; // Import the CSS file
import axios from 'axios';

function PrintauthorList({startupmails,type}){

  const [visibleIndex, setVisibleIndex] = useState(null);
  const [rejected, setrejected] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [fullStartupDetail, setfullStartupDetail] = useState([]); // Store details as an array
//   {//     Email: "sai@gmail.com",//     PANno: "3YE83H894GF",//     GSTno: "BF8E84T38R8",//     websiteAddress: "www.saitech.com",//     certificateNo: 645658738,//     CompanyDOI: "02-06-2005",
//     IssuuingAuthority: "saisaisai",//     IE_code: 83648374,//     IE_DOI: "02-05-2005"// });
const fetchfulldetails = async (email) => {
  try {
    console.log("Fetching details for: ", email);
    const response = await axios.post('http://localhost:5002/api/startup-dash-retrieval', { Email_ID: email }); 
    if (response.data.success) {
      // console.log("AAAAAAA",response.data.data[0]);
      
      return response.data.data[0]; // Return the fetched details
    }
  } catch (error) {
    console.log("Error: ", error);
    return null; // Return null if there's an error
  }
};

function rejectclick(e)
{
  console.log('clicked on reject');
  e.preventDefault();
  setrejected(true);
  
}
async function approveClick(presentmail)
{
   console.log(`you can approve license to ${presentmail}`);
   try {
    const response = await axios.post('http://localhost:5002/api/make-it-licensed', { Email_ID: presentmail }); 
    if (response.data.success) {
      console.log("success licensed");
    }else{
      console.log("failure licensed");
    }
    window.location.reload();
  } catch (error) {
    console.log("Error: ", error);
  }
}

const handleSubmit = async(presentmail) => {
  console.log(`Feedback Submitted: ${feedback} you can reject ${presentmail}`);
  setrejected(false);  // Hide the feedback form after submission
  setFeedback('');     // Optionally clear the feedback after submission
  try {
    const response = await axios.post('http://localhost:5002/api/make-it-LArejected', { Email_ID: presentmail }); 
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
      console.log("failure feedback sending",response.data.message);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  window.location.reload();

};
const handleInputChange = (e) => {
  setFeedback(e.target.value);  // Update the feedback state as the user types
};
  // Fetch details for all emails and store in state
  const getDetailsAll = async () => {
    const allDetails = [];
    for (let eachobj of startupmails) {
      const details = await fetchfulldetails(eachobj.Email_ID); // Fetch details for each email
      if (details) {
        allDetails.push(details); // Push fetched details into array
      }
    }
    console.log(allDetails);
    setfullStartupDetail(allDetails); // Set all fetched details in state
  };

  // Fetch all startup details when component mounts
  useEffect(() => {
    getDetailsAll();
  }, [startupmails]);

  // Toggle the visibility of additional info (phone and district)
  const toggleDetails = (index,email) => {
    setVisibleIndex(visibleIndex === index ? null : index);

  };
  async function pendingAssign(presentmail)
  {
    console.log("you can assign drug inspector",presentmail); // /make-it-assign  Email_ID
    try {
      const response = await axios.post('http://localhost:5002/api/make-it-assign', { Email_ID: presentmail }); 
      if (response.data.success) {
        console.log("success pending assign");
      }else{
        console.log("failure pending assin");
      }
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }

  }

  return (
          <div className="author-container">
                  {startupmails.map((eachemailobj, index) => {
                          const details = fullStartupDetail[index]; // Fetch the details based on the index
                          return (
                                    <div key={index} className="author-item">
                                      <div 
                                        onClick={() => toggleDetails(index)} 
                                        className="author-header"
                                      >
                                        <p className="author-name"> {details ? details.companyName : 'Loading...'} </p>
                                        <p className="author-email">{eachemailobj.Email_ID}</p>
                                      </div>
                              
                                      {visibleIndex === index && (
                                        <div className="author-details">
                                          <div className='author-details-inner'>
                                            <div className='author-details-b1'>
                                              <p>Email: {details.Email}</p>
                                              <p>GST no: {details.GSTno}</p>
                                              <p>PAN no: {details.PANno}</p>
                                              <p>Website: {details.websiteAddress}</p>
                                              <p>Certificate Issuing Authority: {details.IssuuingAuthority}</p>
                                            </div>
                                            <div className='author-details-b2'>
                                              <p>Certificate no: {details.certificateNo}</p>
                                              <p>Date of issue: {details.CompanyDOI}</p>
                                              <p>IE code: {details.IE_code}</p>
                                              <p>IE Date of issue: {details.IE_DOI}</p>
                                            </div>
                                          </div>
                              
                                          <div className='author-details-buttons'>
                                            {type === 'pending' && (
                                              <>
                                                <button 
                                                  className='author-btn-assign'
                                                  onClick={()=>{pendingAssign(eachemailobj.Email_ID)}}
                                                >
                                                  Assign Drug Inspector
                                                </button>
                                                <button className='author-btn-reject' onClick={rejectclick}>
                                                  Reject
                                                </button>
                              
                                                {rejected && (
                                                  <>
                                                    <br />
                                                    <input 
                                                      type='text' 
                                                      name="feedback" 
                                                      id="feedback-inp"
                                                      placeholder='Enter feedback'
                                                      value={feedback}  // Bind the input value to the feedback state
                                                      onChange={handleInputChange}  // Update state when the input changes
                                                    />
                                                    <button onClick={()=>{handleSubmit(eachemailobj.Email_ID)}} id="feed-submit" >Submit the Feedback</button>
                                                  </>
                                                )}
                                              </>
                                            )}
                              
                                            {type === 'accepted' && (
                                              <>
                                                <button className='author-btn-approve' onClick={()=>{approveClick(eachemailobj.Email_ID)}}>
                                                  Approve License
                                                </button>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                              );
                  })} 
        </div> 
  );

}
export default PrintauthorList;