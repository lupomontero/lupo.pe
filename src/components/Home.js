import React from 'react';
import { connect } from 'react-redux';
import Stuff from './Stuff';
import Blog from './Blog';

export const Home = props => (
  <div>
    <Stuff {...props} />
    <Blog />
  </div>
);

export default connect(({ social, stuff }) => ({
  social,
  stuff,
}))(Home);
