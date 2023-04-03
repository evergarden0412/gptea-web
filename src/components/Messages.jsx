import dummyMessage from "../dummyMessage";
import Message from "./Message";

function Messages({ chatId }) {
  const chatMessages = dummyMessage.filter((message) => message.chat === chatId);
  return (
    <ul className="Messages">
      <h1>messages</h1>
      {chatMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ul>
  );
}

export default Messages;
