import React from 'react';
import { Link } from 'react-router-dom';
import Social from './Social';

export default props => (
  <header>
    <h1><Link to="/">Lupo Montero</Link></h1>
    <Social {...props} />
  </header>
);
