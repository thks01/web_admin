import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Group1Page from "./pages/Group1Page";
import Group2Page from "./pages/Group2Page";
import Group3Page from "./pages/Group3Page";
import Group4Page from "./pages/Group4Page";
import Group5Page from "./pages/Group5Page";
import Group6Page from "./pages/Group6Page";
import Group7Page from "./pages/Group7Page";
import Group8Page from "./pages/Group8Page";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import SurverPage from "./pages/SurveyPage";
import NoticePage from "./pages/NoticePage";
import FindEmailPage from "./pages/FindEmailPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import Group1SecondPage from "./pages/Group1SecondPage";

function Main() {
  const [loginStatus, setLoginStatus] = useState(localStorage.getItem("ID"));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage setLoginStatus={setLoginStatus} />} />
          <Route path="group">
            <Route path="1">
              <Route index element={<Group1Page loginStatus={loginStatus} />} />
              <Route
                path="second"
                element={<Group1SecondPage loginStatus={loginStatus} />}
              />
            </Route>
            <Route path="2" element={<Group2Page />} />
            <Route path="3" element={<Group3Page />} />
            <Route path="4" element={<Group4Page />} />
            <Route path="5" element={<Group5Page />} />
            <Route path="6" element={<Group6Page />} />
            <Route path="7" element={<Group7Page />} />
            <Route path="8" element={<Group8Page />} />
          </Route>
          <Route path="register" element={<RegisterPage />} />
          <Route path="findemail" element={<FindEmailPage />} />
          <Route path="findpassword" element={<FindPasswordPage />} />
          <Route
            path="survey"
            element={<SurverPage loginStatus={loginStatus} />}
          />
          <Route
            path="notice"
            element={<NoticePage loginStatus={loginStatus} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
