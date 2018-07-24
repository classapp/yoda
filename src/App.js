import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Person from './pages/Person';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/person/:id' component={Person} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </div>
    );
  }
}

export default App;
