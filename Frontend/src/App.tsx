import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
// import MainPage from "./Components/TopNav";
import LoginPage from "./Pages/LoginPage";

export default function App() {
  return (
    <div>
      <Routes>
      <Route path="/">
       <Route index element={<LoginPage/>}/>
       {/* <Route index element={<MainPage/>}/> */}
       <Route index element={<LoginPage/>}/>
      </Route>
      </Routes>
    </div>
  );
}
