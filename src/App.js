import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Home from './components/Home';
import Post from './components/Post';

export default (props) => console.log(props) || (
  <Router>
    <ScrollToTop>
      <div className="App">
        <Header social={props.social} />
        <Switch>
          <Route exact path="/">
            <Home {...props} />
          </Route>
          <Route path="/:id">
            <Post {...props} />
          </Route>
        </Switch>
      </div>
    </ScrollToTop>
  </Router>
);
