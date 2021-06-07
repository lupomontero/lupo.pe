import Stuff from './Stuff';
import Blog from './Blog';

const Home = ({ stuff, posts }) => (
  <div className="Home">
    <Stuff stuff={stuff} />
    <Blog posts={posts} />
  </div>
);

export default Home;
