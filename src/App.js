import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Bus from './page/bus/Bus';
import Home from './page/home/Home';

const App = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/bus"><Bus /></Route>
        <Route path="/nearby"></Route>
        <Route path="/schedule"></Route>
        <Route path="/collection"></Route>
      </Switch>
    </div>
  );
}

export default App;
