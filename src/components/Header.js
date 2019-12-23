import React from 'react';
import Social from './Social';

const styles = {
  root: {
    marginBottom: 40,
  },
};

export default props => (
  <header style={styles.root}>
    <h1>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          alert('OMG');
          // props.dispatch(push('/'));
        }}
      >
        Lupo Montero
      </a>
    </h1>
    <Social {...props} />
  </header>
);
