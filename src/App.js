import './App.css';
import { useState} from 'react'
import ChatBox from './ChatBox/ChatBox';

function App() {

  return (
    <div className="App">
             <div className="chat-container">
              <ChatBox />
              <ChatBox />
    </div>
    </div>
  );
}

export default App;
