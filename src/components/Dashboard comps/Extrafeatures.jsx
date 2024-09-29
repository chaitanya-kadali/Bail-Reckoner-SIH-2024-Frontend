import React,{useState} from 'react';
import Filterdoctor from './Filterdoctor';
import Filterfarmer from './Filterfarmer';
import '../styles/Extrafeatures.css';
import Inscommunication from './Inscommunication';
export default function Extrafeatures({email}) {
  const [screen, setScreen] = useState(1);

  function godoctor()
  {
    setScreen(1);
  }
  function gofarmer()
  {
    setScreen(2);
  }
  function goinspector()
  {
    setScreen(3);
  }
  return (
  
    <>
    <div className='extra-head'>
        <p className='nav-link' onClick={godoctor}>Doctors Info</p>
        <p className='nav-link' onClick={gofarmer}>Farmers Info</p>
        <p className='nav-link' onClick={goinspector}>License Authority</p>
       
    </div>
    {
           screen ===1 ? (<Filterdoctor email={email}/>) : screen ===2 ? (<Filterfarmer email={email}/>) :screen ===3 ? 
           (<Inscommunication email={email}/>):(null) 
       }
    </>
  )
}
