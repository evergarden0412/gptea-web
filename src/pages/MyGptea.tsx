import styled from "styled-components";

import { useAppSelector } from "../redux/hooks";
import Feature from "../components/Feature";
import Nav from "../components/Nav";
import ChatItemModal from "../components/ChatItemModal";
import ScrapbookModal from "../components/ScrapbookModal";
import ScrapModal from "../components/ScrapModal";
import WithdrawalModal from "../components/WithdrawalModal";

export default function MyGptea() {
  const isOpenChatItemModal = useAppSelector((state) => state.isOpenChatItemModal);
  const isOpenScrapbookModal = useAppSelector((state) => state.isOpenScrapbookModal);
  const isOpenScrapModal = useAppSelector((state) => state.isOpenScrapModal);
  const isOpenWithdrawalModal = useAppSelector((state) => state.isOpenWithdrawalModal);

  return (
    <MyGpteaWrapper>
      <Nav />
      <Feature />
      {isOpenChatItemModal.status && <ChatItemModal chat={isOpenChatItemModal.chat} />}
      {isOpenScrapbookModal.status && <ScrapbookModal scrapbook={isOpenScrapbookModal.scrapbook} />}
      {isOpenScrapModal.status && <ScrapModal message={isOpenScrapModal.message} scrapId={isOpenScrapModal.scrapId} />}
      {isOpenWithdrawalModal.status && <WithdrawalModal />}
    </MyGpteaWrapper>
  );
}

const MyGpteaWrapper = styled.div`
  @media screen and (min-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;
