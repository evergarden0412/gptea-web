import styled from 'styled-components';

const MessageWrapper = styled.li`
  width: 80%;
  background-color: ${(props) => (props.role === 'user' ? 'pink' : 'lightyellow')};
  float: ${(props) => (props.role === 'user' ? 'left' : 'right')};
  border-radius: 3rem;
  ${(props) => (props.role === 'user' ? 'border-top-left-radius: 0' : 'border-bottom-right-radius:0')};
  padding: 1rem 2rem;
  margin-bottom: 1rem;
`;

const MessageContent = styled.div``;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
`;

const MessageCreatedAt = styled.div`
  display: inline-block;
  margin-right: 1rem;
`;

const ScrapButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;

  i {
    font-size: 1.5rem;
  }
`;

function Message({ message }) {
  return (
    <MessageWrapper role={message.role}>
      <MessageContent>{message.content}</MessageContent>
      <MessageInfo>
        <MessageCreatedAt>{new Date(message.createdAt).toLocaleString()}</MessageCreatedAt>
        <ScrapButton>
          <i className="fa-regular fa-bookmark"></i>
        </ScrapButton>
      </MessageInfo>
    </MessageWrapper>
  );
}

export default Message;
