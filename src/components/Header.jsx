import React from 'react'
import './styles/Header.css';
export default function Header() {
  function gochatbot()
  {
    window.location.href='/chatbot';
  }
  function gohome()
  {
    window.location.href='/';
  }
  return (
  
    <div className="home-head">
      <div className='home-first'>
        <div className='outer-img'>
      <div className='home-img'>
        
      </div>
      </div>
      
    <p className='home-name' onClick={gohome}>Ayush 2.0</p>
    </div>
    <button className='heads-button' onClick={gochatbot}>Chat Bot</button>
   </div>
   
  )
}
