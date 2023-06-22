import styled from "styled-components";

function Loading() {
  return (
    <>
      <Wrapper>
        <div className="loader loader-8"></div>
      </Wrapper>
    </>
  );
}

export default Loading;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;

  .loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }
  .loader,
  .loader:before,
  .loader:after {
    animation: 1s infinite ease-in-out;
  }
  .loader:before,
  .loader:after {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .loader-8:before,
  .loader-8:after {
    content: "";
    background-color: #333;
    transform: scale(0);
    animation: loader8 1.5s infinite ease-in-out;
  }
  .loader-8:after {
    animation-delay: 0.75s;
  }

  @keyframes loader8 {
    0% {
      transform: translateX(-100%) scale(0);
    }
    50% {
      transform: translateX(0%) scale(1);
    }
    100% {
      transform: translateX(100%) scale(0);
    }
  }
`;
