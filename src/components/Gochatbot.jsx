import React from 'react'
import './styles/Gochatbot.css';
export default function Gochatbot() {
    function goaichat()
    {
        window.location.href='/chatbot';
    }
  return (
    <div className="home-chatbot">
              <p>Have more questions than our FAQs ? Ask our</p>
              <button onClick={goaichat}>Ai ChatBot</button>
              {/* <p>to chat with our AI chatbot.</p> */}
        </div>
  )
}
