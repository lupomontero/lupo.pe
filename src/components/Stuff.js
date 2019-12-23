import React from 'react';

const Stuff = ({ stuff }) => (
  <div className="Stuff">
    <h2>Stuff</h2>
    <div>
      {stuff.map(item => (
        <a
          key={item.title}
          style={{
            backgroundImage: item && item.thumb ? `url("${item.thumb}")` : 'none',
          }}
          href={item.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
      ))}
    </div>
  </div>
);

export default Stuff;
