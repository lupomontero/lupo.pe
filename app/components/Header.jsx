import { Link } from '@remix-run/react';
import Social from './Social';

const Header = () => (
  <header>
    <h1><Link to="/">Lupo Montero</Link></h1>
    <Social />
  </header>
);

export default Header;
