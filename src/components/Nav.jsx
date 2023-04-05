import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavWrapper = styled.section`
  width: 20%;
  background-color: green;
`;

const NavStyle = styled(NavLink)`
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-decoration: none;
  padding: 1rem;
  color: white;
`;

const NavIcon = styled.div`
  margin-left: 1rem;
  width: 2rem;

  i {
    width: 2rem;
    text-align: center;
  }
`;

const NavText = styled.div`
  margin-left: 1rem;
`;

function Nav() {
  return (
    <NavWrapper>
      <NavStyle to="/" className="navItem">
        <NavIcon>
          <i className="fa-solid fa-mug-hot"></i>
        </NavIcon>
        <NavText>Chat</NavText>
      </NavStyle>
      <NavStyle to="/scrapbooks" className="navItem">
        <NavIcon>
          <i className="fa-regular fa-bookmark"></i>
        </NavIcon>
        <NavText>Scrap</NavText>
      </NavStyle>
      <NavStyle to="/highlights" className="navItem">
        <NavIcon>
          <i className="fa-solid fa-highlighter"></i>
        </NavIcon>
        <NavText>Highlight</NavText>
      </NavStyle>
    </NavWrapper>
  );
}

export default Nav;
