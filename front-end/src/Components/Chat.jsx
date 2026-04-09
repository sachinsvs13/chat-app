import { FaRegEdit } from "react-icons/fa";
import "../Style/Chat.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Chat() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/chats/getChats")
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  }, []);
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
        {chats.map((chat) => {
          return (
            <div className="chat-list-item">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User Avatar"
                className="chat-avatar"
              />
              <div className="chat-info">
                <h3 className="chat-name">{chat.name}</h3>
                <p className="chat-last-message">{chat.lastMessage}</p>
              </div>
            </div>
          );
        })}
      </section>
    </aside>
  );
}
