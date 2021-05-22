import * as React from 'react';
import styles from './styles/char.css';

const Char = ({ char, isStarted, state }) => {
  if (!isStarted || state === 'default') {
    return <span className={styles.default}>{char}</span>;
  }

  return <span className={state === 'error' ? styles.error : styles.success}>{char}</span>;
};

export default Char;
