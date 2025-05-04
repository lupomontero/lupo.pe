import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { CommentCount } from 'disqus-react';
import { fetchJSON } from '../util';

const PostSummary = ({ post }) => (
  <article>
    <h3>
      <Link to={post.id}>
        {post.title}
      </Link>
    </h3>
    <span>{post.publishedAt.toISOString().slice(0, 10)} | </span>
    <CommentCount shortname={'lupomontero'} config={{
      url: post.url,
      identifier: post.id,
      title: post.title,
    }}>
      ...
    </CommentCount>
  </article>
);

const Blog = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetchJSON('./data/posts.json')
      .then(setPosts)
      .catch(setPosts);
  }, []);

  if (!posts) {
    return <>Loading...</>;
  }

  if (posts instanceof Error) {
    return <>Error loading posts...</>;
  }

  return (
    <section className="Blog">
      <h2>Blog Archive</h2>
      {posts.map(post => (
        <PostSummary key={post.id} post={post} />
      ))}
    </section>
  );
};

export default Blog;
