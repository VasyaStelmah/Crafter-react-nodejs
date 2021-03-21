import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import { NavBar } from "./components/Navbar";
import { Home } from "./components/Home";
import SignUp from "./components/Auth";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={SignUp} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
