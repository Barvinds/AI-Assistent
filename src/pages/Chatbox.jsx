import React, { useState, useEffect } from 'react';
import { IoSendSharp } from "react-icons/io5";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const Chatbox = () => {
    const [state, setState] = useState(true); // Changed initial state to true to show chatbox by default
    const [messages, setMessages] = useState([]);
    const [voiceEnabled, setVoiceEnabled] = useState(true);

    useEffect(() => {
        const sendButton = document.querySelector('.send__button');
        const messageInput = document.querySelector('.chatbox__footer input');
        const muteButton = document.querySelector('.mute__button');

        const onSendButton = () => {
            let text1 = messageInput.value;
            if (text1 === "") {
                return;
            }
            let msg1 = { name: "User", message: text1 };
            setMessages([...messages, msg1]);

            fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `message=${encodeURIComponent(text1)}`
            })
            .then(response => response.text())
            .then(reply => {
                let msg2 = { name: "Mr.DOCTOR", message: reply };
                setMessages([...messages, msg2]);
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
            setVoiceEnabled(!voiceEnabled);
            // If disabling voice, cancel any ongoing speech
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
            messageInput.removeEventListener("keyup", () => {});
            muteButton.removeEventListener('click', toggleVoice);
        };
    }, [messages, voiceEnabled]);

    const updateChatText = () => {
        return messages.slice().reverse().map((item, index) => {
            if (item.name === "Mr.DOCTOR") {
                return <div key={index} className="messages__item messages__item--operator">{item.message}</div>;
            } else {
                return <div key={index} className="messages__item messages__item--visitor messages__item--right">{item.message}</div>;
            }
        });
    };

    return (
        <div className="container">
            <div className="chatbox chatbox--active">
                <div className="chatbox__support">
                    <div className="chatbox__header">
                        <div className="chatbox__image--header">
                            <img src="https://www.pngall.com/wp-content/uploads/12/Grandma-PNG-File.png" alt="image"  width="40px" height="40px" />
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
