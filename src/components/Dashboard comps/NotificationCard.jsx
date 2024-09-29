import React from 'react';

const NotificationCard = ({ data }) => {
  const cardStyle = {
    backgroundColor: '#1e90ff',  // Blue background
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
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
      <p style={detailStyle}><strong>LA Email:</strong> {data.LA_Email}</p>
      <p style={detailStyle}><strong>Startup Company:</strong> {data.Startup_Company}</p>
      <p style={detailStyle}><strong>Startup Email:</strong> {data.Startup_Email}</p>
      <p style={detailStyle}><strong>Date:</strong> {data.date}</p>
      <p style={notificationStyle}>"{data.notification}"</p>
    </div>
  );
};

export default NotificationCard;
