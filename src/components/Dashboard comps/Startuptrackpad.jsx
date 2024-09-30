import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../styles/Startuptrackpad.css';

const Startuptrackpad = ({email}) => {
  const [currentStage, setCurrentStage] = useState(2); // Change this value to update the progress
  const [statusInfo, setStatusInfo] = useState({
    Email_ID:"",  // startup s email
    FilledApplication : false,
	AplicationAccepted : false, // (for frontend : if accepted is false the whole stuff should get RED from here to END.)
	ApplicationRejected :false, // if accepted is true then rejected is 100% gonna become false(as it is being initiated with the false value it will be untouched as the drug insp is already pressed accept)
										// VICE VERSA	
	isDrugInspectorAssigned: false,
	isDrugInspectorAccepted : false, // (for frontend : if accepted is false the whole stuff should get RED from here to end)
	isDrugInspectorRejected : false,
	isLicensed: false
  });
  
  const stages = [
    { title: 'Stage 1: Application Submitted', description: 'Your application has been submitted.' },
    { title: 'Stage 2: Connected with Lawyer', description: 'You have been connected to Lawyer' },
    { title: 'Stage 3:  Bail details submitted to lawyer', description: 'Case details submitted for the lawyer' },
    { title: 'Stage 4: Lawyer applied for bail', description: 'Lawyer applied to court for the bail' },
    { title: 'Stage 5: Bail Approved', description: 'Congratulations.Your Bail has been issued.' },
  ];
  // useEffect(() => {
  //   const fetch_status = async () => {
  //     try {
  //       const Startup_Email = email;
  //       const response = await axios.post('http://localhost:5002/api/status-trackpad', { Startup_Email });
  //       const isSuccess = response.data.success;
  //       if (isSuccess) {
  //         const recieved = response.data.statusInfo;
  //         console.log("Received data: ", recieved[0]);
  //         setStatusInfo(recieved[0]); 
  //       }
  //     } catch (error) {
  //       if (error.response) {
  //         console.error("Error Response Data:", error.response.data);
  //         console.error("Error Response Status:", error.response.status);
  //       } else if (error.request) {
  //         console.error("No response received:", error.request);
  //       } else {
  //         console.error("Request error:", error.message);
  //       }
  //     }
  //   };
  
  //   fetch_status();
  // }, []);
  
  
  // useEffect(() => {
  //   const update_currentStage = () => {
  //     if (!statusInfo) return;
  
  //     if (statusInfo.ApplicationRejected) {
  //       setCurrentStage(-2); 
  //     } else if (statusInfo.isDrugInspectorRejected) {
  //       setCurrentStage(-4);
  //     } else if (statusInfo.AplicationAccepted) {
       
  //       if (statusInfo.isLicensed) {
  //         setCurrentStage(5); 
  //       } else if (statusInfo.isDrugInspectorAccepted) {
  //         setCurrentStage(4); 
  //       } else if (statusInfo.isDrugInspectorAssigned) {
  //         setCurrentStage(3); 
  //       } else {
  //         setCurrentStage(2); 
  //       }
  //     } else if (statusInfo.FilledApplication) {
  //       setCurrentStage(1); 
  //     } else {
  //       setCurrentStage(0); 
  //     }
  //   };
  
   
  //   update_currentStage();
  // }, [statusInfo]);
  
 
  useEffect(() => {
    console.log("Current Stage is: ", currentStage);
  }, [currentStage]); 
  

  const isCancelled = currentStage < 0;

  return (
  <>
  <div className='trck-container'>
    <div className="trackpad">
      {stages.map((stage, index) => {
        // If currentStage is negative, stages should be red except for stages greater than |currentStage|
        const isRed = isCancelled && index >= Math.abs(currentStage);
        const isGreen = index < Math.abs(currentStage);
        
        return (
          <div
            key={index}
            className={`stage ${isGreen ? 'active' : ''} ${isRed ? 'cancelled' : ''}`} 
          >
            <h4 className='status-title'>{stage.title}</h4>
            <p>{isRed ? 'Cancelled at this stage' : stage.description}</p>
          </div>
        );
      })}
    </div>
  </div>
</>

  );
};

export default Startuptrackpad;
