import "./App.css";
import MyGptea from "./pages/MyGptea";
import Welcome from "./pages/Welcome";

function App() {
  let isLoggedIn = true;

  return <div className="wrapper">{isLoggedIn ? <MyGptea /> : <Welcome />}</div>;
}

export default App;
