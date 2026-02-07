import { FaRegEdit } from "react-icons/fa";
import "../Style/Chat.css";
export default function Chat() {
  return (
    <aside className="chat">
      <section className="chat-header">
        <h2>Chat</h2>
        <FaRegEdit className="edit-icon" />
      </section>
      <section className="chat-search-container">
        <input type="text" placeholder="Search" className="chat-search-bar" />
      </section>
      <section className="chat-list">
        <div className="chat-list-item">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User Avatar"
            className="chat-avatar"
          />
          <div className="chat-info">
            <h3 className="chat-name">John Doe</h3>
            <p className="chat-last-message">Hey, how are you?</p>
          </div>
        </div>
        <div className="chat-list-item">
          <img
            src="https://randomuser.me/api/portraits/women/1.jpg"
            alt="User Avatar"
            className="chat-avatar"
          />
          <div className="chat-info">
            <h3 className="chat-name">Jane Smith</h3>
            <p className="chat-last-message">Let's catch up later!</p>
          </div>
        </div>
      </section>
    </aside>
  );
}
