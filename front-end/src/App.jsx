import "./App.css";
import Chat from "./Components/Chat";
import ChatMessage from './Components/ChatMessage';
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <div className="app-container">
        <Chat />
        <ChatMessage />
      </div>
    </>
  );
}

export default App;
