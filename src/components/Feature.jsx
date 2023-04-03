import { Routes, Route } from "react-router-dom";
import Chats from "../pages/Chats";
import Chat from "../pages/Chat";
import ScrapBooks from "../pages/ScrapBooks";
import Scraps from "../pages/Scraps";

function Feature() {
  return (
    <section className="feature">
      <Routes>
        <Route path="/" element={<Chats />} />
        <Route path="/chats/:chatId" element={<Chat />} />
        <Route path="/scrapbooks" element={<ScrapBooks />} />
        <Route path="/scrapbooks/:scrapbookId" element={<Scraps />} />
      </Routes>
    </section>
  );
}

export default Feature;
