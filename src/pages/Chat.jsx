import React, { useState, useEffect } from 'react';
import './style.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        const userMessageInput = document.getElementById("user-input");
        userMessageInput.addEventListener("keyup", handleKeyUp);

        // Clean up event listener
        return () => {
            userMessageInput.removeEventListener("keyup", handleKeyUp);
        };
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    const addMessageToChat = (message, isUser = false) => {
        setMessages(prevMessages => [...prevMessages, { message, isUser }]);
    };

    const sendMessage = () => {
        const userMessage = userInput.trim();
        if (userMessage !== "") {
            addMessageToChat(userMessage, true);
            setUserInput("");

            // Send user message to the Flask backend
            fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: userMessage })
            })
            .then(response => response.json())
            .then(data => {
                const botResponse = data.response;
                addMessageToChat(botResponse);
            })
            .catch(error => console.error("Error:", error));
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <section id="chat" className="container section section__height">
        <div className="chat-container">
            <div className="chat-header">
                <div className="inner-1">
                    <div className="control-panel-1">

                    </div>
                </div>
            </div>
            <div className="chat-body" id="chat-body">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    id="user-input"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                    onKeyUp={handleKeyUp}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
        </section>
    );
};

export default Chat;
