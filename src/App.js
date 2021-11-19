import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Drawer from "rc-drawer";
import AllApplications from "./components/AllApplications";
import ByCategory from "./components/ByCategory";
import AllEmail from "./components/AllEmail";
import Menu from "./components/Menu";
import "./css/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Login from "./components/Login";
import AddJury from "./components/AddJury";
import JuryByCategory from "./components/JuryByCategory";
import AllJuries from "./components/AllJuries";
import AllEmailJury from "./components/AllEmailJury";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/"}>Parallax Applications</Link>
      </header>
      <div className="App-page">
        {isOpen ? (
          <div className="openMenu">
            <button onClick={handleOpen}>
              <FontAwesomeIcon icon={faArrowLeft} className="hideShowMenu" />
            </button>
            <nav className="App-menu ">
              <Menu />
            </nav>
          </div>
        ) : (
          <div className="hideMenu">
            <button onClick={handleOpen}>
              <FontAwesomeIcon icon={faArrowRight} className="hideShowMenu" />
            </button>
          </div>
        )}

        <section className="App-content">
          <Switch>
            {<Route exact path="/" component={Login} />}
            {<Route path="/all-applications" component={AllApplications} />}
            {<Route path="/categories" component={ByCategory} />}
            {<Route path="/addJury" component={AddJury} />}
            {<Route path="/getJuries" component={AllJuries} />}
            {<Route path="/getJuriesByCategory" component={JuryByCategory} />}
            {<Route path="/all-emails" component={AllEmail} />}
            {<Route path="/all-emails-juries" component={AllEmailJury} />}
          </Switch>
        </section>
      </div>
    </div>
  );
}

export default App;
