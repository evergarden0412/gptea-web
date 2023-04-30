import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavWrapper = styled.section`
  width: 20%;
  background-color: green;
`;

const NavItem = styled(NavLink)`
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
      <NavItem to="/">
        <NavIcon>
          <i className="fa-solid fa-mug-hot"></i>
        </NavIcon>
        <NavText>Chat</NavText>
      </NavItem>
      <NavItem to="/scrapbooks">
        <NavIcon>
          <i className="fa-regular fa-bookmark"></i>
        </NavIcon>
        <NavText>Scrap</NavText>
      </NavItem>
      <NavItem to="/highlights">
        <NavIcon>
          <i className="fa-solid fa-highlighter"></i>
        </NavIcon>
        <NavText>Highlight</NavText>
      </NavItem>
    </NavWrapper>
  );
}

export default Nav;
