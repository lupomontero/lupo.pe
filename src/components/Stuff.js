import React from 'react';


const styles = (item) => ({
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'row wrap',
    marginBottom: 40,
  },
  item: {
    width: 200,
    height: 150,
    background: 'tomato',
    margin: '0 10px 20px',
    backgroundSize: 'cover',
    backgroundImage: item && item.thumb ? `url("${item.thumb}")` : 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default props => (
  <React.Fragment>
    <h2>Stuff</h2>
    <div style={styles().container}>
      {props.stuff.map(item => (
        <a
          key={item.title}
          className="stuff-item"
          style={styles(item).item} href={item.url || '#'}
          target="_blank"
        >
          {item.title}
        </a>
      ))}
    </div>
  </React.Fragment>
);
