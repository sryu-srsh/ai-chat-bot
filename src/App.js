import './App.css';
import { useState} from 'react'
import ChatBox from './Components/ChatBox';

function App() {

  return (
    <div className="App">
             <div className="chat-container">
              <ChatBox />
    </div>
    </div>
  );
}

export default App;
