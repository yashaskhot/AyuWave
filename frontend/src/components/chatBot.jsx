
import React, { useEffect } from "react";
import axios from "axios";
import { IoMdClose, IoMdSend, IoMdChatbubbles } from "react-icons/io";
import "../Styles/ChatBot.css";

const ChatBot = () => {
  useEffect(() => {
    const open = document.getElementById("open-button");
    const window = document.getElementById("chatbot-window");
    const close = document.getElementById("close-button");

    open.addEventListener("click", () => {
      window.classList.remove("display-none");
      open.classList.add("display-none");
    });

    close.addEventListener("click", () => {
      window.classList.add("display-none");
      open.classList.remove("display-none");
    });
  }, []);

  const submitHandle = async (e) => {
    e.preventDefault();

    const sent = document.createElement("div");
    const reply = document.createElement("div");
    const chatWindow = document.getElementById("chat-window");

    const input = document.getElementById("user-input");
    const prompt = input.value;

    chatWindow.appendChild(sent);
    sent.innerHTML = prompt;
    sent.classList.add("user-message");
    input.value = "";

    try {
      const response = await axios.post("http://localhost:8080/query", {
        query: prompt,
      });
      const answer = response.data.response;
      console.log(response.data)
      const formattedAnswer = answer.replace(/\n/g, "<br>");
      console.log(answer);
      reply.innerHTML = formattedAnswer;
    } catch (err) {
      console.log(err);
    }
    chatWindow.appendChild(reply);
    reply.classList.add("bot-message");
  };

  return (
    <div className="chatbot1">
      <div className="chatbot-window display-none" id="chatbot-window">
        <div className="cb-heading">
          <span>MedAssist</span>
          <IoMdClose
            id="close-button"
            style={{ fontSize: "28px", cursor: "pointer" }}
            onClick={() => {
              const window = document.getElementById("chatbot-window");
              window.classList.add("display-none");
              const open = document.getElementById("open-button");
              open.classList.remove("display-none");
            }}
          />
        </div>
        <div className="chat-window" id="chat-window"></div>
        <div className="chat-input">
          <form autoComplete="false" onSubmit={submitHandle} id="chatbot-form" style={{marginBottom:"-10px"}}>
            <input placeholder="enter query" id="user-input" type="text" style={{width:"321px"}} />
            <div className="icon-box" onClick={submitHandle}>
              <IoMdSend style={{ fontSize: "20px", color: 'white' }} />
            </div>
          </form>
        </div>
      </div>
      <div className="button-wrapper" id="open-button">
        <div className="open-button">
          <IoMdChatbubbles style={{ fontSize: "30px" }} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

