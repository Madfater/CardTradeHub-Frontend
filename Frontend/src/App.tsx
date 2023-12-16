import { Routes, Route, Outlet, Link } from "react-router-dom";
// import MainPage from "./Components/TopNav";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          {/* <Route index element={<MainPage/>}/> */}
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}
