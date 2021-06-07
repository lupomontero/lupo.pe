import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import posts from './data/posts.json';
import social from './data/social.json';
import stuff from './data/stuff.json';
import talks from './data/talks.json';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App
    posts={posts}
    social={social}
    stuff={stuff}
    talks={talks}
  />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
