import styled from 'styled-components';

const PromptWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

const PromptForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  background-color: var(--hover);
`;

const PromptInput = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 600;
  background-color: transparent;
  border: none;
  outline: none;
  padding-right: 3rem;
`;

const PromptButton = styled.button`
  position: absolute;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;

  i {
    font-size: 1.5rem;
  }
`;

function Prompt() {
  return (
    <PromptWrapper>
      <PromptForm>
        <PromptInput placeholder='ask anything' />
        <PromptButton>
          <i className='Prompt__button--submit fa-solid fa-paper-plane'></i>
        </PromptButton>
      </PromptForm>
    </PromptWrapper>
  );
}

export default Prompt;
