function Message({ message }) {
  return (
    <li className={`Message--${message.role}`}>
      <div className="Message__text--content">{message.content}</div>
      <div className="Message__text--createdAt">{new Date(message.createdAt).toLocaleString()}</div>
      <button className="Message__button--scrap">
        <i className="fa-regular fa-bookmark"></i>
      </button>
    </li>
  );
}

export default Message;
