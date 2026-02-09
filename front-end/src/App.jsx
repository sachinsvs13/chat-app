import "./App.css";
import Chat from "./Components/Chat";
import ChatMessage from './Components/ChatMessage';
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-container">
        <Chat />
        <ChatMessage />
      </div>
    </div>
  );
}

export default App;
