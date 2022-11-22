import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home'
import AddVideogame from './Components/Form/Form'
import VideoGameDetails from "./Components/Detail/Detail"

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        
        <Route exact path='/' component={Landing} />
        <Route exact path='/videogame' component={AddVideogame} />
        <Route exact path='/videogame/:id' component={VideoGameDetails} />
        <Route exact path='/home' component={Home} />
        {/* <Route path='*' component={Home} /> */}
        {/* <Route path="*" component={LandingPage} /> */}

      </div>
    </BrowserRouter>
  );
}

export default App;
