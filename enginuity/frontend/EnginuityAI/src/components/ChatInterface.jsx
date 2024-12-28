// src/components/ChatInterface.jsx
import { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentTypingText]);

  const simulateTypingEffect = async (text) => {
    setIsTyping(true);
    setCurrentTypingText('');

    for (let i = 0; i <= text.length; i++) {
      setCurrentTypingText(text.substring(0, i));
      await new Promise(resolve => setTimeout(resolve, 30));
    }

    setIsTyping(false);
    setMessages(prev => [...prev, { type: 'assistant', content: text }]);
    setCurrentTypingText('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
    const userMessage = inputMessage;
    setInputMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Accept': 'text/plain',
        },
        body: userMessage,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseText = await response.text();
      await simulateTypingEffect(responseText);
    } catch (error) {
      console.error('Error:', error);
      await simulateTypingEffect('Sorry, there was an error processing your request. Please ensure the backend server is running.');
    }
  };

  return (
    <div className="app-container">
      <header className="chat-header">
        <div className="logo-container">
          <span className="logo">⚡</span>
          <h1>EnginuityAI</h1>
        </div>
        <p className="tagline">Powered by Intelligent Document Processing</p>
      </header>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>Welcome to EnginuityAI!</h2>
              <p>Ask me anything about your documents.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.type}`}
            >
              {message.type === 'assistant' && <div className="bot-avatar">⚡</div>}
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message assistant">
              <div className="bot-avatar">⚡</div>
              <div className="message-content">
                {currentTypingText}
                <span className="typing-cursor">▊</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="chat-input"
            placeholder="Ask me about your documents..."
          />
          <button type="submit" className="send-button">
            <svg 
              viewBox="0 0 24 24" 
              width="24" 
              height="24" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;