import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import ControlGroupPage from "./pages/ControlGroupPage";
import ExperimentGroup1Page from "./pages/ExperimentGroup1Page";
import ExperimentGroup2Page from "./pages/ExperimentGroup2Page";
import ExperimentGroup3Page from "./pages/ExperimentGroup3Page";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="control">
            <Route index element={<ControlGroupPage />} />
          </Route>
          <Route path="experiment1">
            <Route index element={<ExperimentGroup1Page />} />
          </Route>
          <Route path="experiment2">
            <Route index element={<ExperimentGroup2Page />} />
          </Route>
          <Route path="experiment3">
            <Route index element={<ExperimentGroup3Page />} />
          </Route>
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
