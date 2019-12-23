import React from 'react';

const Social = props => (
  <div className="Social">
    {props.social.map(item => (
      <div key={item.title}>
        <a
          href={item.url}
          title={item.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div dangerouslySetInnerHTML={{__html: item.icon}} />
        </a>
      </div>
    ))}
  </div>
);

export default Social;
