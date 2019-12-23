import React from 'react';
import { Link } from 'react-router-dom';
import { CommentCount } from 'disqus-react';

const PostSummary = ({ post }) => (
  <div style={{ borderTop: '1px solid #006666', paddingBottom: 20 }}>
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
  </div>
);

export default ({ posts }) => (
  <div>
    <h2>Blog Archive</h2>
    {posts.map(post => (
      <PostSummary key={post.id} post={post} />
    ))}
  </div>
);
