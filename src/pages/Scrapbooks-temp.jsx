import dummyScrapbook from "../dummyScrapbook";
import Scrapbook from "../components/Scrapbook";
import { Link } from "react-router-dom";

function Scrapbooks() {
  return (
    <div className="Scrapbooks">
      <h1>Scrapbooks</h1>
      {dummyScrapbook.map((scrapbook) => (
        <Link to={`/scrapbooks/${scrapbook.id}`} key={scrapbook.id}>
          <Scrapbook scrapbook={scrapbook} />
        </Link>
      ))}
    </div>
  );
}

export default Scrapbooks;
