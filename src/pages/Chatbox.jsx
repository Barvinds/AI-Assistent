import React, { useState, useEffect } from 'react';
import { IoSendSharp } from "react-icons/io5";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const Chatbox = () => {
    const [state, setState] = useState(false);
    const [messages, setMessages] = useState([]);
    const [voiceEnabled, setVoiceEnabled] = useState(true);

    useEffect(() => {
        const openButton = document.querySelector('.chatbox__button');
        const chatBox = document.querySelector('.chatbox__support');
        const sendButton = document.querySelector('.send__button');
        const messageInput = document.querySelector('.chatbox__footer input');
        const muteButton = document.querySelector('.mute__button');

        const toggleState = () => {
            setState(!state);
            if (!state) {
                chatBox.classList.add('chatbox--active');
            } else {
                chatBox.classList.remove('chatbox--active');
            }
        };

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

        openButton.addEventListener('click', toggleState);
        sendButton.addEventListener('click', onSendButton);
        messageInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                onSendButton();
            }
        });
        muteButton.addEventListener('click', toggleVoice);

        return () => {
            openButton.removeEventListener('click', toggleState);
            sendButton.removeEventListener('click', onSendButton);
            messageInput.removeEventListener("keyup", () => {});
            muteButton.removeEventListener('click', toggleVoice);
        };
    }, [state, messages, voiceEnabled]);

    const updateChatText = () => {
        return messages.slice().reverse().map((item, index) => {
            if (item.name === "Mr.DOCTOR") {
                return <div key={index} className="messages__item messages__item--operator">{item.message}</div>;
            } else {
                return <div key={index} className="messages__item messages__item--visitor">{item.message}</div>;
            }
        });
    };

    return (
        <div className="container">
            <div className="chatbox">
                <div className="chatbox__support chatbox--active">
                    <div className="chatbox__header">
                        <div className="chatbox__image--header">
                            <img src="https://static.vecteezy.com/system/resources/previews/027/308/947/original/doctor-with-ai-generated-free-png.png" alt="image"  width="20px" />
                        </div>
                        <div className="chatbox__content--header">
                            <h4 className="chatbox__heading--header">MR.DOCTOR</h4>
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
                
                <div className="chatbox__button">
                    <button><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ269SDL-IhWphyT8oV8NrgbVT7PZjaYcgah8-_YW0SSm9GKEFqHmVcQF2iCn5QxVdQwHE&usqp=CAU" width="50px" /></button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
