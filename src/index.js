import './index.css';


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import history from './history';
import store from './store';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Home from './components/Home';
import Post from './components/Post';
import registerServiceWorker from './registerServiceWorker';


const styles = {
  root: {
    padding: 30,
    textAlign: 'center',
    maxWidth: 900,
    margin: '0 auto',
  },
};


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <div style={styles.root}>
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/:id" component={Post}/>
        </div>
      </ScrollToTop>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);


registerServiceWorker();
