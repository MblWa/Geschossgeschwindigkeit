import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './styles/char.css';

const Chunk = ({ char, isStarted, state }) => {
  if (!isStarted || state === 'default') {
    return <span className={styles.default}>{char}</span>;
  }

  return <span className={state === 'error' ? styles.error : styles.success}>{char}</span>;
};

Chunk.propTypes = {
  char: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  isStarted: PropTypes.bool.isRequired,
};

export default Chunk;
