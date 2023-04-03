function ChatItem({ chat }) {
  return (
    <li className="ChatItem">
      <div className="ChatItem__text">{chat.title}</div>
      <button className="ChatItem__button--modify">
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <button className="ChatItem__button--remove">
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
}

export default ChatItem;
