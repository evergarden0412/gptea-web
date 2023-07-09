import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";

import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/" : "https://api.gptea-test.keenranger.dev";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
