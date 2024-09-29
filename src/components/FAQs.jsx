import React, { useState } from "react";
import './styles/FAQs.css';  

const FAQ = (props) => {

  const faqData=props.faqdata;

  const [visibleAnswerIndex, setVisibleAnswerIndex] = useState(null);

  const toggleAnswer = (index) => {
    setVisibleAnswerIndex(visibleAnswerIndex === index ? null : index);
  };

  const gradientstyle = {
    background: 'linear-gradient(109.6deg, rgb(26, 185, 230) 11.3%, rgb(67, 93, 198) 69.9%)',
  };

  return (
    <div className="faq-container" style={gradientstyle}>
      <h1>Frequently Asked Questions - {props.who}</h1>
      {faqData.map((item, index) => (
        <div key={index}>
          <p
            onClick={() => toggleAnswer(index)}
            className="faq-question"
          >
            {item.question}
          </p>
          <div className={visibleAnswerIndex === index ? "faq-answer" : "faq-answer-hidden"}>
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
