import React, { useEffect, useState } from 'react'
import PrintauthorList from './PrintauthorList';
import axios from 'axios';

import '../styles/Authorityhomee.css';

export default function Authorityhome({email}) {


    const [pendingStartupEmails, setpendingStartupEmails ] = useState([]);
    const  [ assignedStartupEmails, setassignedStartupEmails  ] = useState([]);
    const [acceptedStartupEmails, setacceptedStartupEmails ] = useState([]);
    const [licensedStartupEmails,setlicensedStartupEmails ] = useState([]);
    const [rejectedStartupEmails,setrejectedStartupEmails ] = useState([]);
    const [LArejectedStartupEmails,setLArejectedStartupEmails ] = useState([]);

    useEffect(() => { // pending
      const fetchpendingEmails = async () => {
        try {
          const response = await axios.get('http://localhost:5002/api/isfilledapplication-false');
          if(response.data.success && response.data.pendingList.length > 0) {
            setpendingStartupEmails(response.data.pendingList);
          } else {
            setpendingStartupEmails([]); // Set to empty if no emails found
          }
        } catch (error) {
          console.error('Error fetching emails:', error);
          setpendingStartupEmails([]);
        }
      };
  
      fetchpendingEmails();
    }, []); 

    useEffect(() => { // assigned
      const fetchassignedEmails = async () => {
        try {
          const response = await axios.get('http://localhost:5002/api/isDrugInspectorAssigned-true');
          if(response.data.success && response.data.assignedList.length > 0) {
            setassignedStartupEmails(response.data.assignedList);
          } else {
            setassignedStartupEmails([]); // Set to empty if no emails found
          }
        } catch (error) {
          console.error('Error fetching emails:', error);
          setassignedStartupEmails([]);
        } 
      };
  
      fetchassignedEmails();
    }, []); 

    useEffect(() => { // accepted
      const fetchacceptedEmails = async () => {
        try {
          const response = await axios.get('http://localhost:5002/api/isDrugInspectorAccepted-true');
          if(response.data.success && response.data.acceptedList.length > 0) {
            setacceptedStartupEmails(response.data.acceptedList);
          } else {
            setacceptedStartupEmails([]); // Set to empty if no emails found
          }
        } catch (error) {
          console.error('Error fetching emails:', error);
          setacceptedStartupEmails([]);
        } 
      };
  
      fetchacceptedEmails();
    }, []); 

    useEffect(() => { // rejected
      const fetchrejectedEmails = async () => {
        try {
          const response = await axios.get('http://localhost:5002/api/isDrugInspectorRejected-true');
          if(response.data.success && response.data.rejectedList.length > 0) {
            setrejectedStartupEmails(response.data.rejectedList);
          } else {
            setrejectedStartupEmails([]); // Set to empty if no emails found
          }
        } catch (error) {
          console.error('Error fetching emails:', error);
          setrejectedStartupEmails([]);
        } 
      };
  
      fetchrejectedEmails();
    }, []); 

    useEffect(() => { // licensed
      const fetchlicensedEmails = async () => {
        try {
          const response = await axios.get('http://localhost:5002/api/isLicensed-true');
          if(response.data.success && response.data.licensedList.length > 0) {
            setlicensedStartupEmails(response.data.licensedList);
          } else {
            setlicensedStartupEmails([]); // Set to empty if no emails found
          }
        } catch (error) {
          console.error('Error fetching emails:', error);
          setlicensedStartupEmails([]);
        } 
      };
  
      fetchlicensedEmails();
    }, []); 

    useEffect(() => { // licensed
      const fetchlicensedEmails = async () => {
        try {
          const response = await axios.get('http://localhost:5002/api/isLArejected');
          if(response.data.success && response.data.datal.length > 0) {
            setLArejectedStartupEmails(response.data.datal);
          } else {
            setLArejectedStartupEmails([]); // Set to empty if no emails found
          }
        } catch (error) {
          console.error('Error fetching emails:', error);
          setLArejectedStartupEmails([]);
        } 
      };
  
      fetchlicensedEmails();
    }, []);
  return (
  <div className='auth-total'>  
      <div className='sect-container'>  
            <p className='auth-hm'>Pending Startups</p>
            <p style={{fontSize:"1.5rem",color:"blue"}}> You Can now Assign the drug inspectors for below startups</p>
            <br/>
            <div>
                { pendingStartupEmails.length === 0 ? (
                    <h1>No Startups found</h1>
                  ):(
                    < PrintauthorList startupmails={pendingStartupEmails} 
                    type={'pending'}/>
                  )
                  }
            </div>
      </div>
      <div className='sect-container'>
            <p className='auth-hm'>Rejected Startups</p>
            <p style={{fontSize:"1.5rem",color:"blue"}}> Startups those got rejected during application verification</p>
            <br/>
            <div>
                { LArejectedStartupEmails.length === 0 ? (
                    <h1>No Startups found</h1>
                  ):(
                    < PrintauthorList startupmails={LArejectedStartupEmails} 
                    type={'rejected'}/>
                  )
                  }
            </div>
      </div>
        <div className='sect-container'>
              <p className='auth-hm'>Drug Inspector Assigned Startups</p>
              <p style={{fontSize:"1.5rem",color:"blue"}}> Waiting for drug inspectors chemical verification and acceptance.</p>
            <br/>
              <div>
                    { assignedStartupEmails.length === 0 ? (
                        <h1>No Startups found</h1>
                      ):(
                        < PrintauthorList startupmails={assignedStartupEmails} 
                        type={'assigned'}/>
                      )
                      }
              </div>
        </div>

        <div className='sect-container'>
              <p className='auth-hm'>Drug Inspector Accepted Startups</p>
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
        </div>

        
  </div>
  )
}
