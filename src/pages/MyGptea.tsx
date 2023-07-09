import styled from "styled-components";

import Feature from "../components/Feature";
import Nav from "../components/Nav";

export default function MyGptea() {
  return (
    <MyGpteaWrapper>
      <Nav />
      <Feature />
    </MyGpteaWrapper>
  );
}

const MyGpteaWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
