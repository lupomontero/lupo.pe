import React from 'react';
import Stuff from './Stuff';
import Blog from './Blog';

export default ({ stuff, posts }) => (
  <div className="Home">
    <Stuff stuff={stuff} />
    <Blog posts={posts} />
  </div>
);
