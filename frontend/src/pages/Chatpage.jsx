import { useParams } from 'react-router-dom'; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Chatpage.css'
import { useCookies } from 'react-cookie';

const YourComponent = () => {
  const [cookies] = useCookies(['authToken']);
  const [chatData, setChatData] = useState([]);
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    if (!cookies.authToken) {
      // Redirect to login or handle unauthorized access
    } else {
      fetchChatData();
    }
  }, [cookies]);

  useEffect(() => {
    if (chatId) {
      // Start long polling for new messages
      const pollMessages = async () => {
        try {
          const headers = { Authorization: `Bearer ${cookies.authToken}` };
          const response = await axios.get(`http://localhost:8000/api/message/${chatId}`, { headers });
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          // Poll again after a short delay
          setTimeout(pollMessages, 3000); // Poll every 3 seconds, adjust as needed
        }
      };

      // Start the initial polling
      pollMessages();
    }
  }, [chatId, cookies.authToken]);

  const fetchChatData = async () => {
    try {
      const headers = { Authorization: `Bearer ${cookies.authToken}` };
      const response = await axios.get('http://localhost:8000/api/chat', { headers });
      setChatData(response.data);
      if (response.data.length > 0) {
        setChatId(response.data[0]._id); // Assuming you want to set the first chat as the default chat
      }
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const content = document.getElementById('messageInput').value;
      const headers = { Authorization: `Bearer ${cookies.authToken}` };
  
      const response1 = await axios.post('http://localhost:8000/api/chat', { userId }, { headers });
      setChatId(response1.data._id);
  
      const data = {
        content: content,
        chatId: response1.data._id,
        data: 'http://res.cloudinary.com/dtymujq8m/image/upload/v1696615589/p5vin4vhecmgtn1yvqlx.jpg',
      };
  
      const response = await axios.post('http://localhost:8000/api/message', data);
      console.log('API Response:', response.data.content);
  
      document.getElementById('messageInput').value = '';
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <div className='chatui-body'>
   
        <div className="app-wrapper">
            <div className="app-header">
            {/* <div>
                <h2>Image Upload</h2>
            <input type="file" accept="image/*" onChange={(e) => setimage(e.target.files[0])}/> 
            <button onClick={handleUpload}>Upload</button> 
            </div> */}
                <h2> Chat </h2>
                <span className="friend-status">Online</span>
            </div>
            <div className="app-message-body">
                {messages.map((message) => (
                    <div key={message._id} className="message my-3">
                        <div className="sender-avatar">{/* Display sender's avatar here */}</div>
                        <div className="message-content">
                            <div>
                                <strong>{message.sender.chatName}</strong> {message.content}
                            </div>
                            <div className="timestamp">{new Date(message.createdAt).toLocaleTimeString()}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="app-input-area">
                <input type="text" id="messageInput" placeholder="Your message here..." />
                <button type="submit" onClick={sendMessage}>
                    <svg viewBox="0 0 512 512" width="25" height="25" title="paper-plane">
                        <path fill="" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" />
                    </svg>
                </button>
            </div>
        </div>
        </div>
    );
};

export default YourComponent;
