import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { CommentCount } from 'disqus-react';

const PostSummary = ({ post, dispatch }) => (
  <div style={{ borderTop: '1px solid #006666', paddingBottom: 20 }}>
    <h3>
      <a href={post.id} onClick={e => {
        e.preventDefault();
        dispatch(push(`/${post.id}`));
      }}>
        {post.title}
      </a>
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

export const Blog = ({ posts, dispatch }) => (
  <div>
    <h2>Blog Archive</h2>
    {posts.map(post => (
      <PostSummary key={post.id} post={post} dispatch={dispatch} />
    ))}
  </div>
);

export default connect(({ blog }) => ({
  posts: blog.posts.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1;
    } else if (a.publishedAt > b.publishedAt) {
      return -1;
    } else {
      return 0;
    }
  }),
}))(Blog);
