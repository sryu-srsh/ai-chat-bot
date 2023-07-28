import { useState } from "react";
import usericon from '../assets/user.svg';
import boticon from '../assets/bot.svg';

const ChatBox = () => {
    const [chatBoxOne, setChatBoxOne] = useState([])
    const [chatOneInput, setChatOneInput] = useState("")
    const [select, setSelect] = useState('gptneo')
    const [loading, setLoading] = useState(false)
  
    const chatBoxOneButtonHandler = (v) => {
      console.log(v)
      setLoading(true)
      setChatBoxOne((prev) => ([...prev, {
        message: chatOneInput,
        user: "User"
      }]))
  
      const data = {
        "prompt": chatOneInput,
         "model": select
      };
  
    // Options for the fetch() function
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify(data)
    };
    // Send the POST request
    fetch("http://localhost:8000/generate", options)
        .then(response => response.json())
        .then(data => {
        //   console.log(data)
          setLoading(false)
          setChatBoxOne((prev) => ([...prev, {
            message: data.generated_text,
            user: "Model"
          }]))
        })
        .catch(error => console.error("Error:", error));
  
      setChatOneInput("")
    }
  
    return (        <div className="chat-box" id="chatBox1">
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
    <div id="chatMessages1">{chatBoxOne && chatBoxOne.length !== 0 && chatBoxOne.map(item => {
      return <>{item.user === "User" ? <div className="chat1">
      <div className="profile">
          <img className="userimg" src={usericon} />
      </div>
      <div className="message">{item.message}</div>
  </div> : (<div className="chat2">
  <div className="profile">
      <img className="botimg" src={boticon} />
  </div>
  <div className="response">{item.message}</div>
</div>)}</>

  
    })}</div>
    <div className="chat-input">
        <input type="text" id="chatInput1" value={chatOneInput} onChange={(e) => setChatOneInput(e.target.value)} placeholder="Send a message"/>
        <button id="button1" onClick={() => chatBoxOneButtonHandler({select})}><i className="fa-solid fa-paper-plane"></i></button>
    </div>
</div>)
}

export default ChatBox