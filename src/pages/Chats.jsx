import { Link } from "react-router-dom";

import dummyChat from "../dummyChat";
import ChatItem from "../components/ChatItem";

function Chats() {
  return (
    <div className="Chats">
      <h1>Chats</h1>
      <ul className="Chats__list">
        {dummyChat.map((chat) => (
          <Link to={`/chats/${chat.id}`} key={chat.id}>
            <ChatItem chat={chat} />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Chats;
