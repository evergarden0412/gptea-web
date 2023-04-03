function Scrapbook({ scrapbook }) {
  return (
    <div className="Scrapbook">
      <i className="Scrapbook__text--icon fa-regular fa-bookmark"></i>
      <div className="Scrapbook__text--title">{scrapbook.title}</div>
      <div className="Scrapbook__text--color"></div>
    </div>
  );
}

export default Scrapbook;
