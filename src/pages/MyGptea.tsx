import styled from "styled-components";

import Feature from "../components/Feature";
import Nav from "../components/Nav";

const MyGpteaWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

function MyGptea() {
  return (
    <MyGpteaWrapper>
      <Nav />
      <Feature />
    </MyGpteaWrapper>
  );
}

export default MyGptea;
