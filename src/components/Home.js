import React from 'react';
import Stuff from './Stuff';
import Blog from './Blog';

export default props => (
  <div>
    <Stuff {...props} />
    <Blog {...props} />
  </div>
);
