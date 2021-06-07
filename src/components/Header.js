import { Link } from 'react-router-dom';
import Social from './Social';

const Header = props => (
  <header>
    <h1><Link to="/">Lupo Montero</Link></h1>
    <Social {...props} />
  </header>
);

export default Header;
