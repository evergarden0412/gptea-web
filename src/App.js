import styled from 'styled-components';
import MyGptea from './pages/MyGptea';
import Welcome from './pages/Welcome';

const AppWrapper = styled.div`
  width: 80vw;
  height: 80vh;
`;

function App() {
  let isLoggedIn = true;

  return <AppWrapper>{isLoggedIn ? <MyGptea /> : <Welcome />}</AppWrapper>;
}

export default App;
