import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import DownloadPage from "./pages/DownloadPage";
import ProgressPage from "./pages/ProgressPage";

function Main() {
  const [loginStatus, setLoginStatus] = useState(localStorage.getItem("ID"));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage setLoginStatus={setLoginStatus} />} />
          {/* <Route path="findpassword" element={<FindPasswordPage />} /> */}
          <Route
            path="download"
            element={<DownloadPage loginStatus={loginStatus} />}
          />
          <Route
            path="progress"
            element={<ProgressPage loginStatus={loginStatus} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
