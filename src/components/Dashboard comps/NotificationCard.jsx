import React from 'react';

const NotificationCard = ({ data }) => {
  const cardStyle = {
    backgroundColor: '#1e90ff',  // Blue background
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '60vw',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const detailStyle = {
    marginBottom: '5px',
    fontSize: '1rem',
  };

  const notificationStyle = {
    // fontStyle: 'italic',
    marginTop: '15px',
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>Notification</div>
      <p style={detailStyle}><strong>Prisoner Name :</strong> {data.name}</p>
      <p style={detailStyle}><strong>Charges :</strong> {data.charges}</p>
      <p style={detailStyle}><strong>Ground for Bail :</strong> {data.ground}</p>
      <p style={detailStyle}><strong>Date of arrest :</strong> {data.date}</p>
      <p style={notificationStyle}>"{"its been 40 days.Please check out my bail petition"}"</p>
    </div>
  );
};

export default NotificationCard;
