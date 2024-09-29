import React, { useState, useEffect } from 'react';
import '../styles/PrintdrugList.css';


function PrintdrugList({data}) { 

  const [visibleIndex, setVisibleIndex] = useState(null);
  const [rejected, setrejected] = useState(false);
  const [feedback, setFeedback] = useState('');
  // Fetch details for a single startup
  const handleInputChange = (e) => {
    setFeedback(e.target.value);  // Update the feedback state as the user types
  };
 

  // Toggle the visibility of additional info
  const toggleDetails = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };


  function rejectclick(e)
  {
    e.preventDefault();
    setrejected(true);
  }
  
const handleSubmit = async(presentmail) => {
  console.log(`Feedback Submitted: ${feedback} you can reject ${presentmail}`);

  setrejected(false);  // Hide the feedback form after submission
  setFeedback('');     // Optionally clear the feedback after submissio
};
 async function acceptstartup(presentmail)
  {
    console.log("you can assign drug inspector",presentmail);
  }
  return (
    
    <div className="Drugp-container">
      {data.map((eachobj, index) => {

        return (
          <div key={index} className="Drugp-item">
            <div
              onClick={() => toggleDetails(index)}
              className="Drugp-header"
            >
              <div className='prof-img' > </div>
              <p className="Drugp-name"> 
                {"Name : " + eachobj.name} 
              </p>
              <p className="Drugp-email">
              {"charges : " + eachobj.charges} 
              </p>
            </div>

            {/* Render details if visible */}
            {visibleIndex === index  && (
              <div className="Drugp-details">
                <div className='Drugp-details-inner'>
                  <div className='Drugp-details-b1'>
                    <p>{"Case Number : " + eachobj.caseNumber} </p>
                    <p>{"Court Name : " + eachobj.courtName} </p> 
                    <p>{"Date of Arrest : " + eachobj.dateOfArrest}</p>
                    <p>{"Grounds for Bail : " + eachobj.groundsForBail}</p>
                  </div>
                </div>
                <div className='Drugp-details-buttons'>
                  <button 
                    className='Drugp-btn-assign'
                    onClick={()=>{acceptstartup("")}}
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
              <button onClick={()=>{handleSubmit("")}} id="feed-submit">Submit</button>
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
