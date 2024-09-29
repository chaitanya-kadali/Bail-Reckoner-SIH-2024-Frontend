import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../styles/Startuptrackpad.css';

const Startuptrackpad = ({email}) => {
  const [currentStage, setCurrentStage] = useState(0); // Change this value to update the progress
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
    { title: 'Stage 2: Application Accepted', description: 'Your application has been Accepted by Licensing authority' },
    { title: 'Stage 3: DrugInspector Assigned', description: 'Nearby Drug inspector is assigned for your company' },
    { title: 'Stage 4: DrugInspector Accepted', description: 'Drug inspector verified and Accepted' },
    { title: 'Stage 5: License Approved', description: 'Congratulations.Your License has been issued.' },
  ];
  
  useEffect(() => {
    const fetch_status = async () => {
      try {
        const Startup_Email = email;
        const response = await axios.post('http://localhost:5002/api/status-trackpad', { Startup_Email });
        const isSuccess = response.data.success;
        if (isSuccess) {
          const recieved = response.data.statusInfo;
          console.log("Received data: ", recieved[0]);
          setStatusInfo(recieved[0]); // Asynchronous update
        }
      } catch (error) {
        if (error.response) {
          console.error("Error Response Data:", error.response.data);
          console.error("Error Response Status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request error:", error.message);
        }
      }
    };
  
    fetch_status();
  }, []); // Run only once when the component mounts
  
  // Use another useEffect to handle updating the currentStage based on statusInfo
  useEffect(() => {
    const update_currentStage = () => {
      if (!statusInfo) return;
  
      // If the application is rejected, set the current stage to -1 (negative for red) to signify cancellation
      if (statusInfo.ApplicationRejected) {
        setCurrentStage(-2); // Rejected before drug inspector assigned
      } else if (statusInfo.isDrugInspectorRejected) {
        setCurrentStage(-4); // Rejected by drug inspector
      } else if (statusInfo.AplicationAccepted) {
        // Continue with normal accepted stages
        if (statusInfo.isLicensed) {
          setCurrentStage(5); // License approved
        } else if (statusInfo.isDrugInspectorAccepted) {
          setCurrentStage(4); // Drug inspector accepted
        } else if (statusInfo.isDrugInspectorAssigned) {
          setCurrentStage(3); // Drug inspector assigned
        } else {
          setCurrentStage(2); // Application accepted
        }
      } else if (statusInfo.FilledApplication) {
        setCurrentStage(1); // Application submitted
      } else {
        setCurrentStage(0); // No application filled yet
      }
    };
  
    // Update the stage whenever statusInfo changes
    update_currentStage();
  }, [statusInfo]); // Re-run whenever statusInfo changes
  
  // Log the current stage whenever it changes
  useEffect(() => {
    console.log("Current Stage is: ", currentStage);
  }, [currentStage]); // Log currentStage whenever it changes
  

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
