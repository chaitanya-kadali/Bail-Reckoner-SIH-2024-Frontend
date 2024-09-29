import './styles/Login.css';
import React,{ useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import doctorpic from '../assets/logindoctor.jpg';
import startuppic from '../assets/loginstartup.jpg';
import farmerpic from '../assets/loginfarmer.jpg';
import drugpic from '../assets/logindrug.jpg';
import authorpic from '../assets/loginauthority.jpg';
function Login(){
  const [logit, setLogit] = useState({Email_ID:"  ",password:""});
  const [invalidtext, setInvalidtext] = useState("");
  const [replacepic, setreplacepic] = useState();
  const params=useLocation();
  let value=new URLSearchParams(params.search);
  let usertype=value.get('value');
  let invalid=false;
  const intake = usertype === "farmer" ? "phone number" : "email";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogit({ ...logit, [name]: value });
    if(name==="password"&& value.length<8)
      {
        setInvalidtext("Password must contain 8 letters");
      }
      else if(name==="password"&&value.length>=8){
        setInvalidtext("");
      }
};

const handelSubmit =async(e)=>{
  e.preventDefault();
  if(logit.password.length<8)
  {
      invalid=true;
  }
  invalid ? setInvalidtext("password must contain 8 letters") : setInvalidtext("");
  if(usertype ==="farmer")
    setLogit({phone_number:logit.Email_ID, password:logit.password}); // changing the req.body backend recievers feild name in-according to the farmer
  try
  {
      const response = await axios.post(`http://localhost:5002/api/${usertype}-login`, logit); 
      if (response.data.success) 
      {
            const tokenrec = response.data.token;
            alert("Logged in successfully!");
            if(usertype==="farmer")
          { 
               window.location.href=`/farmerdash?phno=${logit.phone_number}&token=${tokenrec}`;
               return null;
          }
            const encodedEmail = btoa(logit.Email_ID); // Encode the email using Base64
            window.location.href = `/${usertype}dash?email=${encodedEmail}&token=${tokenrec}`;
      
    }else{
        console.log("thrown message from backend : ",response.data.message);
        alert("thrown message from backend : "+response.data.message);
        }
  
    } catch (error) {
    console.error('Error occurred:', error);
    alert("invalid login details , please try again");
  }
 
}
useEffect(() => {
  
 if(usertype==='doctor')
   setreplacepic(doctorpic);
 else if(usertype==='druginspector') 
   setreplacepic(drugpic);
 else if(usertype==='farmer') 
   setreplacepic(farmerpic);
  else if(usertype==='authority')
    setreplacepic(authorpic);
 else if(usertype==='startup')
    setreplacepic(startuppic); 
}, []);
  return(
      <div className='login-total'>
      <Header/>
      <div className='login-flex'>
        <img src={replacepic} id='login-img'/>
      <form id='login-form'onSubmit={handelSubmit}>

        <div className="Login-container">
        {usertype==="authority" ?  <p className="login-headin">{"Licensing Authority Login"}</p> : 
        usertype==="druginspector"? <p className="login-headin">{"Drug Inspector Login"}</p> :
          <p className="login-headin">{usertype.replace(/^./, str => str.toUpperCase())} Login</p>
        }
        <label className="Login-label">Enter the {intake} </label>
          <input type="text" className="Login-input" name="Email_ID" required onChange={handleChange}/><br />
          <label className="Login-label">Enter the password</label>
          <input type="password" className="Login-input" name="password" onChange={handleChange}/><br />
          { invalidtext && <p className="Login-error">{invalidtext}</p>}
          <button className="Login-button">Submit</button>
       
      </div>
      </form>
      </div>

      </div>
    );
}
export default Login;