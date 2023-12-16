import { Routes, Route, Outlet, Link } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import ShoppingCart from "./Pages/ShoppingCart";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shopcart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </div>
  );
}
