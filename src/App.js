import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Error from './pages/Error';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rooms" component={Rooms} />
        <Route path="/rooms:slug" component={SingleRoom} />
        <Route component={Error}></Route>
      </Switch>
    </>
  );
}

export default App;