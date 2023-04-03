function Message({ message }) {
  return (
    <li className={`Message--${message.role}`}>
      <div className="Message__text--content">{message.content}</div>
      <div className="Message__text--createdAt">{new Date(message.createdAt).toLocaleString()}</div>
      <i className="Message__button--scrap fa-regular fa-bookmark"></i>
    </li>
  );
}

export default Message;
