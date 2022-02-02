import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}

export default Home;
