import React, { useEffect,useState } from 'react'
import '../styles/Authendicatedrug.css';
import axios from 'axios';

export default function Authendicatedrug({email}) {

  const [visibleIndex, setVisibleIndex] = useState(null);
    const [pendingDrugEmails, setPendingDrugEmails ]=useState([]);

    useEffect(() => { // fetch pending
      const fetchpendingEmails = async () => {
        try {
          const response = await axios.get('http://localhost:5002/api/pending-to-permision');
          if(response.data.success) {
            console.log("seee ",...response.data.datad);
            // {...response.data.data}[0]
            setPendingDrugEmails([...response.data.datad]);
          }else{
            console.log("some error while fetching pending drug ins list");
          }
        } catch (error) {
          console.error('Error fetching emails:', error);
          setPendingDrugEmails([]);
        } 
      };
  
      fetchpendingEmails();
    }, []);
   async function Acceptdrug(presentmail)
    {
      console.log("you can accept drug inspector",presentmail); // /grant-permission-to-druginspector Email_ID
      try {
        const response = await axios.post('http://localhost:5002/api/grant-permission-to-druginspector', { Email_ID: presentmail }); 
        if (response.data.success) {
          console.log("success granted permit");
        }else{
          console.log("failure to grant permit");
        }
      } catch (error) {
        console.log("Error: ", error);
      }

    }

      // Toggle the visibility of additional info
  const toggleDetails = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };
 
  return (  
    <>
    <div className='drug-au-main'>
    <p style={{fontSize:"1.5rem"}}>List of drug inspectors to get Approved</p>
    {pendingDrugEmails.map((eachemailobj, index) => {
        const details = eachemailobj; // Fetch the details based on the index\
        console.log("dettt    ",eachemailobj);
        /*
        Email_ID saivenkatkallepalli@gmail.com"
district "West Godavari"
name "Drug Inspector"
phone_number 8803434888
state "andhra pradesh" 
        */
        
        return (
          <div key={index} className="Druga-item">
            <div
              onClick={() => toggleDetails(index)}
              className="Druga-header"
            >
               <p style={{color:"white"}}>Name: {details.name}</p> 
            <p style={{color:"white"}}>Email:{details.Email_ID}</p> 
            </div>

            {visibleIndex === index && details && (
              <div className="Druga-details">
                <div className='Druga-details-inner'>
                  <div className='Druga-details-b1'>
                    
                    <p>Phone no: {details.phone_number}</p>
                    <p>District: {details.district}</p>
                    <p>State: {details.state}</p>
                    {/* <PdfViewer email_prop={details.Email_ID} /> */}
                  </div>
                </div>
                <div className='Druga-details-buttons'>
                  <button 
                    className='Druga-btn-assign'
                    onClick={() =>{ Acceptdrug(eachemailobj.Email_ID)}}
                  >
                    Accept
                  </button>
  
                </div>
              </div>
            )}
          </div>
        ); 
      })}
      </div>
    </>
  )
}
