import Home from "../src/pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "../src/pages/login/Login";
import Register from "../src/pages/register/Register";

import { Route, Routes, BrowserRouter ,Navigate} from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {

  const { user } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />}></Route>
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <Login />}
          ></Route>
          <Route path="/profile/:username" element={<Profile />}></Route>
          <Route
            path="/register"
            element={user ? <Navigate replace to="/" /> : <Register />}
          ></Route>
          <Route
            path="/messenger"
            element={!user ? <Navigate replace to="/" /> : <Messenger />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
