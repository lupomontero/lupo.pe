import React from 'react';
import { useParams } from 'react-router-dom';
import { DiscussionEmbed } from 'disqus-react';

const styles = {
  root: {
    maxWidth: '50em',
    margin: '0 auto',
    textAlign: 'left',
  },
};

export default ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  return (
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
};
