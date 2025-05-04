import { useEffect, useState } from 'react';
import { fetchJSON } from '../util';
import Blog from '../components/Blog';
import Stuff from '../components/Stuff';
import Talks from '../components/Talks';

const IndexRoute = () => {
  const [data, setData] = useState();

  useEffect(() => {
    Promise.all([
      fetchJSON('./data/stuff.json'),
      fetchJSON('./data/talks.json'),
    ])
      .then(([stuff, talks]) => {
        setData({ stuff, talks });
      })
      .catch(setData);
  }, []);

  if (!data) {
    return <>Loading...</>;
  }

  if (data instanceof Error) {
    return <>Error loading data...</>;
  }

  return (
    <>
      <Stuff stuff={data.stuff} />
      <Talks talks={data.talks} />
      <Blog />
    </>
  );
};

export default IndexRoute;
