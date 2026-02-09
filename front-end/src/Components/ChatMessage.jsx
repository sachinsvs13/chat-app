import "../Style/ChatMessage.css";

export default function ChatMessage() {
  return (
    <main className="chat-message">
      <div className="message-avatar">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User Avatar"
          className="chat-avatar"
        />
        <h2 className="message-sender">John Doe</h2>
      </div>
      <div className="message-body">
        <div className="message-content">Hello, how are you?</div>
        <div className="message-timestamp">10:30 AM</div>
      </div>
      <div className="message-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          className="message-input"
        />
      </div>
    </main>
  );
}
