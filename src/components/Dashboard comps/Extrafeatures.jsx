import React,{useState} from 'react';
import Filterdoctor from './Filterdoctor';
import Filterfarmer from './Filterfarmer';
import '../styles/Extrafeatures.css';
import Inscommunication from './Inscommunication';
export default function Extrafeatures({email}) {
  const [screen, setScreen] = useState(3);
  return (
  
    <>
    <div className='extra-head'>
    
       
    </div>
    {
         screen ===3 ? 
           (<Inscommunication email={email}/>):(null) 
       }
    </>
  )
}
