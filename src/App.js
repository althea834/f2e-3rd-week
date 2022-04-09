import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Bus from './page/bus/Bus';
import Home from './page/home/Home';
import Schedule from './page/schedule/Schedule';
import RoadInfo from './page/bus/RoadInfo';

const App = () => {
  return <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route path="/bus/:city/:uid" component={RoadInfo}></Route>
    <Route path="/bus" component={Bus}></Route>
    <Route path="/nearby"></Route>
    <Route path="/schedule" component={Schedule}></Route>
    <Route path="/collection"></Route>
  </Switch>
}

export default App;
