import { useParams } from "react-router-dom";

import Messages from "../components/Messages";
import Prompt from "../components/Prompt";

function Chat() {
  const { chatId } = useParams();

  return (
    <div className="Chat">
      <h1>Chat</h1>
      <Messages chatId={Number(chatId)} />
      <Prompt />
    </div>
  );
}

export default Chat;
