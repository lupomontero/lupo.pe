import React from 'react';
import { connect } from 'react-redux';
import { DiscussionEmbed } from 'disqus-react';

const styles = {
  root: {
    maxWidth: '50em',
    margin: '0 auto',
    textAlign: 'left',
  },
};

export const Post = ({ post }) => (
  <div className="post" style={styles.root}>
    <h1>{post.title}</h1>
    <p>{post.publishedAt}</p>
    <div dangerouslySetInnerHTML={{ __html: post.body }} />
    <DiscussionEmbed shortname={'lupomontero'} config={{
      url: post.url,
      identifier: post.id,
      title: post.title,
    }} />
  </div>
);


export default connect(({ blog }, { match }) => ({
  post: blog.posts.find(post => post.id === match.params.id),
}))(Post);
