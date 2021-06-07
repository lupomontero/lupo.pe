import ReactDOM from 'react-dom';
import Home from './Home';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home stuff={[]} posts={[]} talks={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
