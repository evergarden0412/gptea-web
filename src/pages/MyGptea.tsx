import styled from "styled-components";

import { useAppSelector } from "../redux/hooks";
import Feature from "../components/Feature";
import Nav from "../components/Nav";
import ChatItemModal from "../components/ChatItemModal";
import ScrapbookModal from "../components/ScrapbookModal";
import ScrapModal from "../components/ScrapModal";
import WithdrawalModal from "../components/WithdrawalModal";

export default function MyGptea() {
  const { isOpenChatItemModal, isOpenScrapbookModal, isOpenScrapModal, isOpenWithdrawalModal } = useAppSelector(
    (state) => state
  );

  return (
    <MyGpteaWrapper>
      <Nav />
      <Feature />
      {isOpenChatItemModal.status && <ChatItemModal chat={isOpenChatItemModal.chat} />}
      {isOpenScrapbookModal.status && <ScrapbookModal scrapbook={isOpenScrapbookModal.scrapbook} />}
      {isOpenScrapModal.status &&
        (isOpenScrapModal.scrapId ? (
          <ScrapModal message={isOpenScrapModal.message} scrapId={isOpenScrapModal.scrapId} />
        ) : (
          <ScrapModal message={isOpenScrapModal.message} />
        ))}
      {isOpenWithdrawalModal.status && <WithdrawalModal />}
    </MyGpteaWrapper>
  );
}

const MyGpteaWrapper = styled.div`
  width: 100%;
  height: 100%;

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;
