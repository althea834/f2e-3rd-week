import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Bus from './page/bus/Bus';
import RoadInfo from './page/bus/RoadInfo';
import Home from './page/home/Home';


const App = (props) => {
  return <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route path="/bus/:uid" component={RoadInfo}></Route>
    <Route path="/bus" component={Bus}></Route>
    <Route path="/nearby"></Route>
    <Route path="/schedule"></Route>
    <Route path="/collection"></Route>
  </Switch>
}

export default App;
