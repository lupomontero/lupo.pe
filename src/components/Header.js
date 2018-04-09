import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Social from './Social';

const styles = {
  root: {
    marginBottom: 40,
  },
};

export const Header = props => (
  <header style={styles.root}>
    <h1>
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          props.dispatch(push('/'));
        }}
      >
        Lupo Montero
      </a>
    </h1>
    <Social {...props} />
  </header>
);

export default connect(({ social }) => ({ social }))(Header);
