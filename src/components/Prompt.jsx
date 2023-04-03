function Prompt() {
  return (
    <form className="Prompt">
      <input className="Prompt__input" placeholder="ask anything" />
      <button>
        <i className="Prompt__button--submit fa-solid fa-paper-plane"></i>
      </button>
    </form>
  );
}

export default Prompt;
