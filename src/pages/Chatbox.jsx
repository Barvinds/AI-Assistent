import React, { useState, useEffect } from 'react';
import { IoSendSharp } from "react-icons/io5";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const Chatbox = () => {
    const [state, setState] = useState(true); // Use state to control visibility if needed
    const [messages, setMessages] = useState([]);
    const [voiceEnabled, setVoiceEnabled] = useState(true);

    useEffect(() => {
        const sendButton = document.querySelector('.send__button');
        const messageInput = document.querySelector('.chatbox__footer input');
        const muteButton = document.querySelector('.mute__button');

        const onSendButton = () => {
            const text = messageInput.value.trim();
            if (text === "") {
                return;
            }
            const userMessage = { name: "User", message: text };
        
            // First, we add the user message to the messages state.
            setMessages(prevMessages => [...prevMessages, userMessage]);
        
            fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `message=${encodeURIComponent(text)}`
            })
            .then(response => response.text())
            .then(reply => {
                // Then, we add the server's reply to the messages state.
                const replyMessage = { name: "Mr.DOCTOR", message: reply };
                setMessages(prevMessages => [...prevMessages, replyMessage]);
                if (voiceEnabled) {
                    speak(reply);
                }
                messageInput.value = '';
            })
            .catch(error => {
                console.error('Error:', error);
                messageInput.value = '';
            });
        };
        const speak = (message) => {
            const speech = new SpeechSynthesisUtterance(message);
            speech.lang = 'en-US';
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 2;
            window.speechSynthesis.speak(speech);
        };

        const toggleVoice = () => {
            setVoiceEnabled(prevState => !prevState);
            if (!voiceEnabled) {
                window.speechSynthesis.cancel();
            }
        };

        sendButton.addEventListener('click', onSendButton);
        messageInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                onSendButton();
            }
        });
        muteButton.addEventListener('click', toggleVoice);

        return () => {
            sendButton.removeEventListener('click', onSendButton);
            messageInput.removeEventListener("keyup", event => {});
            muteButton.removeEventListener('click', toggleVoice);
        };
    }, [voiceEnabled]);

    const updateChatText = () => {
        return messages.length === 0 ? (
            <div className="messages__placeholder">Ask any queries...</div>
        ) : (
            messages.slice().reverse().map((item, index) => {
                return item.name === "Mr.DOCTOR" ? (
                    <div key={index} className="messages__item messages__item--operator">{item.message}</div>
                ) : (
                    <div key={index} className="messages__item messages__item--visitor messages__item--right">{item.message}</div>
                );
            })
        );
    };

    return (
        <div className="container">
            <div className="chatbox chatbox--active">
                <div className="chatbox__support">
                    <div className="chatbox__header">
                        <div className="chatbox__image--header">
                            <img src="https://media3.giphy.com/media/FAskxGppmEJdhBLn5k/giphy.gif" alt="image" width="40px" height="40px" />
                        </div>
                        <div className="chatbox__content--header">
                            <h4 className="chatbox__heading--header">DR.GRANDMA</h4>
                        </div>
                    </div>
                    <div className="chatbox__messages">
                        {updateChatText()}
                    </div>
                    <div className="chatbox__footer">
                        <input type="text" placeholder="Write a message..." />
                        <button className="chatbox__send--footer send__button"><IoSendSharp size={30} color='white'/></button>
                        <button className="mute__button">
                            {voiceEnabled ? <HiSpeakerWave size={26} color='white'/> : <HiSpeakerXMark size={26} color='white'/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
