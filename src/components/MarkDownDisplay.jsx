import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownDisplay = ({data}) => {
  const markdown = ` ${data} `;

  return (
    <div className="markdown-container">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
