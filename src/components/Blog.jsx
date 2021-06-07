import { Link } from 'react-router-dom';
import { CommentCount } from 'disqus-react';

const PostSummary = ({ post }) => (
  <article>
    <h3>
      <Link to={post.id}>
        {post.title}
      </Link>
    </h3>
    <span>{post.publishedAt} | </span>
    <CommentCount shortname={'lupomontero'} config={{
      url: post.url,
      identifier: post.id,
      title: post.title,
    }}>
      ...
    </CommentCount>
  </article>
);

const Blog = ({ posts }) => (
  <section className="Blog">
    <h2>Blog Archive</h2>
    {posts.map(post => (
      <PostSummary key={post.id} post={post} />
    ))}
  </section>
);

export default Blog;
