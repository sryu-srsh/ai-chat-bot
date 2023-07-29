import { useState } from "react";
import usericon from '../assets/user.svg';
import boticon from '../assets/bot.svg';

const ChatBox = () => {
    const [chatBoxOne, setChatBoxOne] = useState([])
    const [chatOneInput, setChatOneInput] = useState("")
    const [select, setSelect] = useState('gpt2')
    const [loading, setLoading] = useState(false)
  
    const chatBoxOneButtonHandler = () => {
        setChatBoxOne((prev) => ([
          ...prev,
          {
            message: chatOneInput,
            user: "User",
          },
          {
            message: "",
            user: "Model",
            loading: true,
          },
        ]));
      
        setLoading(true);
        let dots = '';
        const interval = setInterval(() => {
          if (dots.length < 3) {
            dots += '.';
          } else {
            dots = '';
          }
          setLoading(dots);
        }, 500);
      
        const data = {
          "prompt": chatOneInput,
          "model": select
        };
      
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
      
        fetch("http://localhost:8000/generate", options)
          .then((response) => response.json())
          .then((data) => {
            setChatBoxOne((prev) =>
              prev.map((item, index) => {
                if (index === prev.length - 1) {
                  return {
                    ...item,
                    message: data.generated_text,
                    loading: false,
                  };
                }
                return item;
              })
            );
          })
          .catch((error) => {
            console.error("Error:", error);
            setChatBoxOne((prev) => (prev.map((item, index) => {
              if (index === prev.length - 1) {
                return {
                  ...item,
                  message: "Oops! An error occurred.",
                  user: "Model",
                  loading: false, 
                };
              } else {
                return item;
              }
            })));
          })
          .finally(() => {
            clearInterval(interval);
          });
      
        setChatOneInput("");
      };
    return ( 
    <div className="chat-box" id="chatBox1">
    <div className="model">
        <div className="m">
            <i className="fa-solid fa-grip-vertical"></i>
            <select id="models" name="models" value={select} onChange={(e) => {
                setSelect(e.target.value)
            }}>
                <option value="gptneo">
                    gpt-neox-20b</option>
                <option value="gpt2">gpt-2</option>
            </select>
        </div>
            <div className="icons">
                <i className="fa-solid fa-code"></i>
                <i className="fa-solid fa-minus"></i>
                <i className="fa-solid fa-plus"></i>
                <i className="fa-solid fa-gear"></i>
            </div>
    </div>
    
    {/* <!-- Chat window 1 content will be added here --> */}
    <div id="chatMessages1">
    {chatBoxOne &&
  chatBoxOne.length !== 0 &&
  chatBoxOne.map((item, index) => {
    return (
      <div key={index} className={item.user === "User" ? "chat1" : "chat2"}>
        <div className="profile">
          <img className={item.user === "User" ? "userimg" : "botimg"} src={item.user === "User" ? usericon : boticon} />
        </div>
        <div className={item.user === "User" ? "message" : "response"}>
          {item.message}
          {item.loading && <div className="loading-animation">{loading}</div>}
        </div>
      </div>
    );
  })}
    </div>
    <div className="chat-input">
        <input type="text" id="chatInput1" value={chatOneInput} onChange={(e) => setChatOneInput(e.target.value)} placeholder="Send a message"/>
        <button id="button1" onClick={() => chatBoxOneButtonHandler({select})}><i className="fa-solid fa-paper-plane"></i></button>
    </div>
</div>)
}
export default ChatBox