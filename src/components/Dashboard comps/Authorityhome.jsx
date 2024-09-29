import React, { useEffect, useState } from 'react'
import PrintauthorList from './PrintauthorList';
import axios from 'axios';
import '../styles/Authorityhomee.css';

export default function Authorityhome({email}) {


    const [pendingStartupEmails, setpendingStartupEmails ] = useState(["k.Ravi kumar","H. Rajesh","R. Saleem"]);
    const [acceptedStartupEmails, setacceptedStartupEmails ] = useState(["A.Jeevan kumar","P.Sasi","Y.Avinash"]);
    const [rejectedStartupEmails,setrejectedStartupEmails ] = useState(["T.Dhanush","S.Sushma","G.Lakshmi"]);

   
  return (
  <div className='auth-total'>  
      <div className='sect-container'>  
            <p className='auth-hm'>Bail pending</p>
            <p style={{fontSize:"1.5rem",color:"blue"}}>These prisoners are pending for Bail.</p>
            <br/>
            <div>
                { 
                    < PrintauthorList startupmails={pendingStartupEmails} 
                    type={'pending'}/>
                  
                  }
            </div>
      </div>
      <div className='sect-container'>
            <p className='auth-hm'>Bail accepted</p>
            <p style={{fontSize:"1.5rem",color:"blue"}}> These prisoners Bail is Approved.</p>
            <br/>
            <div>
                {
                    < PrintauthorList startupmails={acceptedStartupEmails} 
                    type={'accepted'}/>
                }
                  
            </div>
      </div>
        <div className='sect-container'>
              <p className='auth-hm'>Bail rejected</p>
              <p style={{fontSize:"1.5rem",color:"blue"}}>  These prisoners Bail is Rejected.</p>
            <br/>
              <div>
                   {                        < PrintauthorList startupmails={rejectedStartupEmails} 
                        type={'rejected'}/>
                      
                      }
              </div>
        </div>

        {/* <div className='sect-container'>
              <p className='auth-hm'>Bail granted Prisoners</p>
              <p style={{fontSize:"1.5rem",color:"blue"}}> Chemically verified and Accepted by Drug inspector.</p>
              <br/>
              <div>
                  { acceptedStartupEmails.length === 0 ? (
                      <h1>No Startups found</h1>
                    ):(
                      < PrintauthorList startupmails={acceptedStartupEmails} 
                      type={'accepted'}/>
                    )
                    }
              </div>
        </div>

        <div className='sect-container'>
            <p className='auth-hm'>Drug Inspector Rejected Startups</p>
            <p style={{fontSize:"1.5rem",color:"blue"}}> Rejected by Drug inspector due to presence of harmful chemicals.</p>
            <br/>
            <div>
                { rejectedStartupEmails.length === 0 ? (
                    <h1>No Startups found</h1>
                  ):(
                    < PrintauthorList startupmails={rejectedStartupEmails} 
                    type={'rejected'}/>
                  )
                  }
            </div>
        </div>

        <div className='sect-container'>
            <p className='auth-hm'>Licensed Startups</p>
            <p style={{fontSize:"1.5rem",color:"green"}}> Successfully Licensed Startups.</p>
            <br/>
            <div>
                { licensedStartupEmails.length === 0 ? (
                    <h1>No Startups found</h1>
                  ):(
                    < PrintauthorList startupmails={licensedStartupEmails} 
                    type={'licensed'}/>
                  )
                  }
            </div>
        </div> */}

        
  </div>
  )
}
