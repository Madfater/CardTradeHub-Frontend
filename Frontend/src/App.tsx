import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import MainPage from "./Components/TopNav";

export default function App() {
  return (
    <div>
      <Routes>
      <Route path="/">
        <Route index element={<MainPage/>}/>
      </Route>
      </Routes>
    </div>
  );
}
