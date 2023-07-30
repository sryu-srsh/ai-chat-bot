import './App.css';
import { useState} from 'react'
import ChatBox from './Components/ChatBox'

function App() {
    const [count, updateCount] = useState(1)
    const rows = [];

    const increaseCount = (val) => {
        // This is to ensure atleast one ChatBox is present
        if(count === 1 && val === -1){
            return
        }
        updateCount(count + val)
    }

    for (let i = 0; i < count; i++) {
        rows.push(<ChatBox key={i} count={count} increaseCount={increaseCount}/>);
    }

    return (
        <div className="App">
                 <div className="chat-container">
                 {rows}
        </div>
        </div>
    );
}

export default App;