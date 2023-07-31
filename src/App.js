import React, { useState, createContext } from 'react';
import './App.css';
import ChatBox from './Components/ChatBox';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import IosShareIcon from '@mui/icons-material/IosShare';

export const ChatContext = createContext()

function App() {
  const [count, updateCount] = useState(1);

  const [sharedInput, setSharedInput] = useState("")
  const [sync, setSync] = useState(false)
  const [sendBtn, setSendBtn] = useState(false)

  const increaseCount = (val) => {
    if (count === 1 && val === -1) {
      return;
    }
    updateCount(count + val);
  };

  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(<ChatBox key={i} count={count} increaseCount={increaseCount} />);
  }

  return (
    <ChatContext.Provider value={{
        sharedInput, setSharedInput, sync, sendBtn, setSendBtn
    }}>
    <div className="App">
    <header>
      <AutoAwesomeIcon className="title-icon" style={{ fontSize: 15 }}  />
      <span className='Title'>LLM Contrast</span>
      <div id="out"></div>
      <button class ="buttonlogin">
      <input className="check" type="checkbox" value={sync} id={"check"} onChange={(e) => {
            setSync(e.target.checked)
        }}/>
         <span classname= 'Sharechat' > Sync Chats</span>
      </button> 
    </header>
      <div className="chat-container">
        {rows}
      </div>
    </div>
    </ChatContext.Provider>
  );
}

export default App;
