import { Link } from 'react-router';
import Social from './Social';

const Header = () => (
  <header>
    <h1><Link to="/">Lupo Montero</Link></h1>
    <Social />
  </header>
);

export default Header;
