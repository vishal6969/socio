import Home from "../src/pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "../src/pages/login/Login";
import Register from "../src/pages/register/Register";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile/:username" element={<Profile/>}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
