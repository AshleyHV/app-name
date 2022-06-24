import HomeComponent from "../Components/HomeComponent/HomeComponent";
import HeaderComponent from "../Components/HeaderComponent/HeaderComponent";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useMatch,
  useLocation,
} from "react-router-dom";

const Router = () => (
  <BrowserRouter>
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/home" element={<HomeComponent />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default Router;
