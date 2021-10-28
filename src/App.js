import { Switch, Route, Link } from "react-router-dom";
import AllApplications from "./components/AllApplications";
import ByCategory from "./components/ByCategory";
import AllEmail from "./components/AllEmail";
import Menu from "./components/Menu";
import "./css/styles.css";
import AddJury from "./components/AddJury";
import AllJuries from "./components/AllJuries";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/"}>Parallax Applications</Link>
      </header>
      <div className="App-page">
        <nav className="App-menu ">
          <Menu />
        </nav>
        <section className="App-content">
          <Switch>
            {<Route path="/all-applications" component={AllApplications} />}
            {<Route path="/categories" component={ByCategory} />}
            {<Route path="/addJury" component={AddJury} />}
            {<Route path="/getJuries" component={AllJuries} />}
            {<Route path="/all-emails" component={AllEmail} />}
          </Switch>
        </section>
      </div>
    </div>
  );
}

export default App;
