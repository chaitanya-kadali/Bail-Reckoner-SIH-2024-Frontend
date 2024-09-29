import Header from './Header';
import Footer from './Dashboard comps/Footer';

import MarkdownDisplay from './MarkDownDisplay';
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const systemMessage = {
  role: 'system',
  content: "Explain things like you're talking to a software professional with 2 years of experience."
};

function AiChatBot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm a Aayush 2.0 ai chat-model (powered by Gemini Ai)! Ask me anything!",
      sentTime: 'just now',
      sender: 'Gemini Ai',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);

    await processMessageToBackend(newMessages);
  };

  async function processMessageToBackend(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === 'Assistant' ? 'assistant' : 'user',
      content: messageObject.message,
    }));
  
    try {
      const response = await fetch('http://localhost:5002/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messagesreq: apiMessages,
        }),
      });
  
      const data = await response.json();

      // const testing = `<MarkdownDisplay data={data.data} />`;
      setMessages([...chatMessages, {
        message: data.data,
        sender: 'Assistant',
      }]);
    } catch (error) {
      console.error('Error communicating with the server:', error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
    <Header/>
    <div className="gipp">
      <div style={{ position: 'relative', height: '75vh', width: '98vw',paddingTop:'100px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="Aayush Chatbot is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default AiChatBot;

