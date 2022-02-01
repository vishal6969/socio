import Navbar from "./components/navbar/Navbar";
import Home from "../src/pages/home/Home";
import Profile from "./pages/profile/Profile";
import { Users } from "../src/dummyData";


function App() {
  return (
    <>
      <Profile user={ Users[0]}/>
    </>
  );
}

export default App;
