// import { DiscussionEmbed } from 'disqus-react';
import { DiscussionEmbed } from '../lib/disqus';

const Post = ({ post }) => {
  return (
    <div className="Post">
      <h1>{post.title}</h1>
      <p>{post.publishedAt.toISOString().slice(0, 10)}</p>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <DiscussionEmbed shortname={'lupomontero'} config={{
        url: post.url,
        identifier: post.id,
        title: post.title,
      }} />
    </div>
  );
};

export default Post;
