import React ,{useState,useEffect}from 'react'
import "../styles/Inscommunication.css";
import axios from 'axios';
export default function Inscommunication({email}) {
    const [isEnabled, setIsEnabled] = useState(false); 
    const [clicks, setClicks] = useState(false);
    const [feedback,setFeedback]=useState([]);

    useEffect( ()=>{
     const getit =async()=>{
       try{
            console.log("the start");
            const Email = email;
          const response = await axios.post("http://localhost:5002/api/startup-feedback-get",{Email});
          setFeedback(response.data.data);

      }
      catch(error){
          console.log(error);
        }
      try{
              const Startup_Email = email;
              const isnotifyResponse = await axios.post("http://localhost:5002/api/is-notify-eligible",{Startup_Email});
              setIsEnabled(isnotifyResponse.data.success);//finished is example varibale plz modify it.
            console.log("enableeeeeeeeeeeee  ",isnotifyResponse.data.success);  
        }
    catch(error){
        console.log(error);
      }
    }
    getit();

    },[])
  
    const handleSubmit =async (e) => {
      e.preventDefault();
      const NotificationMsgData=e.target.elements.sendmail.value;
      // console.log(NotificationMsgData)
      const Startup_Email =email;
      const response =await axios.post("http://localhost:5002/api/LA-Notificationpost",{Startup_Email,NotificationMsgData}); 
      if(response.data.success){
        alert("Successfully notified the licensing authority !");
        setIsEnabled(false);
      setClicks(false); 
      } else{
        alert("Failed to notify the licensing authority !");
      }
       
    };
  
    function isclicked() {
    if(isEnabled)
    {
      console.log("clicked");
      
      setClicks(true);
    }
    }
  return (
   <>
   <div className='ins-cont'>
   <div className="ins-main">
    <p className="ins-head">Communication with Licensing Authority</p>
    <p className="ins-feed">Feedback:</p>
     
     { feedback.length===0 ? <p className="paragraph"> There are no feedbacks yet. </p>
                          : <ol>{
                            feedback.map((each_feedback, index) => (
                              <li key={index} className="paragraph">
                                {each_feedback}
                              </li>
                            ))
                          
                          } </ol>
    }
    <button
        disabled={!isEnabled}
        className={`toggle-button ${isEnabled ? "active" : "inactive"}`}
        onClick={isclicked}
    >
        Re-notify
    </button>

    {isEnabled && clicks && (
        <form onSubmit={handleSubmit}>
            <input type="text" name="sendmail" placeholder="What do you wanna say to the inspector ?" className="input-field" />
            <button type="submit"  className="submit-button">Submit</button>
        </form>
    )}

   { isEnabled ? null: <p style={{color:"blue",fontSize:"1.4rem"}}> Hey You have used your chance.<br></br>You can't send your next Notification till next 2 days</p> }
</div>
</div>
 </>
  )
}
