import Header from "../../components/Header";
import Introduction from "./Introduction";
import About from "./About";
import Experiences from "./Experiences";
import Project from "./Project";
import Courses from "./Courses";
import Contact from "./Contact";
import Footer from "./Footer";
import LeftSider from "./LeftSider";
import { useSelector } from "react-redux";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);

  return (
    <div className="bg-primary">
      <Header />
      { portfolioData && (
        <div className="max-w-[1350px] mx-auto sm:px-24 px-5">
          <Introduction />
          <About />
          <Experiences />
          <Project />
          <Courses />
          <Contact />
          <Footer />
          <LeftSider />
        </div>
      )}
    </div>
  );
}

export default Home;
