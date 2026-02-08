import '../Style/ChatMessage.css'

export default function ChatMessage() {
  return (
    <main>
         <div className="chat-message">
            <div className="message-sender">John Doe</div>
            <div className="message-content">Hello, how are you?</div>
            <div className="message-timestamp">10:30 AM</div>
        </div>
    </main>
  );
}