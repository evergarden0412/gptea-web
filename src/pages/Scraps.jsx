import { useParams } from "react-router-dom";
import dummyMessage from "../dummyMessage";
import Scrap from "../components/Scrap";

function Scraps() {
  const { scrapbookId } = useParams();
  const scraps = dummyMessage.filter((message) => message.scrapbooks.includes(Number(scrapbookId)));
  return (
    <div className="Scraps">
      <h1>Scraps</h1>
      <ul className="Scraps__list">
        {scraps.map((scrap) => (
          <Scrap key={scrap.id} scrap={scrap} />
        ))}
      </ul>
    </div>
  );
}

export default Scraps;
