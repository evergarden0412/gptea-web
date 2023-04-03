function ChatItem({ chat }) {
  return (
    <li className="ChatItem">
      <div className="ChatItem__text">{chat.title}</div>
      <i class="ChatItem__button--modify fa-solid fa-pen-to-square"></i>
      <i class="ChatItem__button--remove fa-solid fa-trash-can"></i>
    </li>
  );
}

export default ChatItem;
