import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './styles/chunk.css';

const Chunk = ({ chunk, isStarted, state }) => {
  if (!isStarted || state === 'default') {
    return <span className={styles.default}>{chunk}</span>;
  }

  return <span className={state === 'error' ? styles.error : styles.success}>{chunk}</span>;
};

Chunk.propTypes = {
  chunk: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  isStarted: PropTypes.bool.isRequired,
};

export default Chunk;
