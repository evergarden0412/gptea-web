import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import dummyMessage from '../dummyMessage';
import Scrap from '../components/Scrap';

const ScrapsWrapper = styled.div``;

function Scraps() {
  const { scrapbookId } = useParams();
  const scraps = dummyMessage.filter((message) => message.scrapbooks.includes(Number(scrapbookId)));

  return (
    <ScrapsWrapper>
      <ul className="Scraps__list">
        {scraps.map((scrap) => (
          <Scrap key={scrap.id} scrap={scrap} />
        ))}
      </ul>
    </ScrapsWrapper>
  );
}

export default Scraps;
