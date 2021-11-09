import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import GameCreated from "./components/GameCreated";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
    <div>
    <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/creategame" component={GameCreated} />
          <Route path="/videogame/:id" component={Detail} />
        </Switch>
    </div>
 </BrowserRouter> );
}

export default App;
