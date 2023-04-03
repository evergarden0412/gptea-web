import { Routes, Route } from "react-router-dom";
import Chats from "../pages/Chats";
import Chat from "../pages/Chat";
import Scrapbooks from "../pages/Scrapbooks";
import Scraps from "../pages/Scraps";

function Feature() {
  return (
    <section className="feature">
      <Routes>
        <Route path="/" element={<Chats />} />
        <Route path="/chats/:chatId" element={<Chat />} />
        <Route path="/scrapbooks" element={<Scrapbooks />} />
        <Route path="/scrapbooks/:scrapbookId" element={<Scraps />} />
      </Routes>
    </section>
  );
}

export default Feature;
