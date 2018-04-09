import React from 'react';

export default props => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    {props.social.map(item => (
      <div key={item.title} style={{ margin: '0 5px' }}>
        <a href={item.url} title={item.title} target="_blank">
          <div
            className="social-icon"
            style={{ width: 20 }}
            dangerouslySetInnerHTML={{__html: item.icon}}
          />
        </a>
      </div>
    ))}
  </div>
);
