import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <section className="nav">
      <NavLink to="/" className="navItem">
        <i className="navIcon fa-solid fa-mug-hot"></i>
        <div className="navText">Chat</div>
      </NavLink>
      <NavLink to="/scrapbooks" className="navItem">
        <i className="navIcon fa-regular fa-bookmark"></i>
        <div className="navText">Scrap</div>
      </NavLink>
      <NavLink to="/highlights" className="navItem">
        <i className="navIcon fa-solid fa-highlighter"></i>
        <div className="navText">Highlight</div>
      </NavLink>
    </section>
  );
}

export default Nav;
