import React, { useState } from 'react';
import '../styles/PeerForum.css';

const sampleData = [
  {
    id: 1,
    question: "What are the best funding options for AYUSH startups?",
    answers: [
      "You can apply for AYUSH ministry grants.",
      "Consider angel investors with experience in healthcare.",
      "Look into government schemes like Startup India.",
      "Venture capitalists focused on wellness sector.",
      "Crowdfunding platforms can also be helpful.",
      "Connect with AYUSH-specific incubators.",
      "Check for state-specific funding programs.",
      "There are accelerators that provide seed funding."
    ]
  },
  {
    id: 2,
    question: "How to get a license for AYUSH product manufacturing?",
    answers: [
      "You need to apply through AYUSH department in your state.",
      "Ensure your product follows AYUSH ministry guidelines.",
      "Submit the necessary documentation for approval.",
      "Consult with a legal advisor for regulatory requirements.",
      "You might need a GMP certification for manufacturing.",
      "There are consultants who can help with the application.",
      "Different states have slightly different procedures.",
      "Follow up regularly with the licensing authority."
    ]
  },
  {
    id: 3,
    question: "What are the marketing strategies for AYUSH products?",
    answers: [
      "Target wellness-focused consumers on social media.",
      "Leverage influencers in the wellness and health space.",
      "Offer free trials or consultations for first-time users.",
      "Use digital marketing channels like Google Ads.",
      "Highlight the benefits of traditional practices.",
      "Collaborate with wellness centers for endorsements.",
      "Participate in AYUSH-related expos and events.",
      "Educate your audience about the health benefits."
    ]
  },
  {
    id: 4,
    question: "How to scale AYUSH startups internationally?",
    answers: [
      "Understand the regulatory requirements of other countries.",
      "Partner with international wellness brands.",
      "Focus on digital marketing targeting global audiences.",
      "Build a strong online presence with e-commerce.",
      "Consider exporting through government schemes.",
      "Tap into international health & wellness trends.",
      "Collaborate with international AYUSH practitioners.",
      "Attend international trade shows and events."
    ]
  }
];

const PeerForum = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleCardClick = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="peer-forum">
        <p id='per-hed'>Peer Forum</p>
      {sampleData.map(({ id, question, answers }) => (
        <div key={id} className="question-card" onClick={() => handleCardClick(id)}>
          <h2>{question}</h2>
          {activeQuestion === id && (
            <div className="answers">
              {answers.map((answer, idx) => (
                <p key={idx}>{answer}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PeerForum;
