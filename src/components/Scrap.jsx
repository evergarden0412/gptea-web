function Scrap({ scrap }) {
  return (
    <li className="Scrap">
      <div className="Scrap__text--content">{scrap.content}</div>
      <button className="Scrap__button--remove">
        <i className="Scrap__icon--remove fa-regular fa-bookmark"></i>
      </button>
      <button className="Scrap__button--move">
        <i className="Scrap__icon--move fa-sharp fa-solid fa-share"></i>
      </button>
    </li>
  );
}

export default Scrap;
