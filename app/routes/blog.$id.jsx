import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchJSON } from '../lib/util';
import Post from '../components/Post';

const BlogPostRoute = () => {
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchJSON(`/data/posts/${id}.json`)
      .then(setPost)
      .catch(setPost);
  }, [id]);

  if (!post) {
    return <>Loading...</>;
  }

  if (post instanceof Error) {
    return <>Error loading post...</>;
  }

  return <Post post={post} />;
};

export default BlogPostRoute;
