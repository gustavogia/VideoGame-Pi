import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from "./components/LadingPage.jsx"
import Home from "./components/Home.jsx"
import Detail from "./components/Detail.jsx"
import CreateVideogame from "./components/CreateVideogame"
import UpDateCard from "./components/UpDateCard"



function App() {
  return (
    <BrowserRouter>
    
    
      <Switch>

      <Route exact path='/' component={LandingPage} />
      <Route exact path= "/home" component={Home}/>
      <Route exact path='/home/:id' component={Detail} />
      <Route exact path='/videogame' component={CreateVideogame} />
      <Route exaact path="/updatecard/:id" component={UpDateCard}/>
      
      </Switch>
    
    </BrowserRouter>
  );
}

export default App;
