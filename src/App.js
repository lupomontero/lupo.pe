import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Home from './components/Home';
import Post from './components/Post';

const App = ({ posts, social, stuff }) => (
  <div className="App">
    <Router>
      <ScrollToTop />
      <Header social={social} />
      <Switch>
        <Route exact path="/">
          <Home stuff={stuff} posts={posts} />
        </Route>
        <Route path="/:id">
          <Post posts={posts} />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
