import Stuff from './Stuff';
import Blog from './Blog';
import Talks from './Talks';

const Home = ({ stuff, posts, talks }) => (
  <div className="Home">
    <Stuff stuff={stuff} />
    <Talks talks={talks} />
    <Blog posts={posts} />
  </div>
);

export default Home;
