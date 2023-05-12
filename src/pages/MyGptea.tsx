import styled from 'styled-components';
import Feature from '../components/Feature';
import Nav from '../components/Nav';

const MyGpteaWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

function MyGptea({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <MyGpteaWrapper>
      <Nav setIsLoggedIn={setIsLoggedIn} />
      <Feature setIsLoggedIn={setIsLoggedIn} />
    </MyGpteaWrapper>
  );
}

export default MyGptea;
