import * as React from 'react';
import * as PropTypes from 'prop-types';
import Char from './Char';
import styles from './styles/sampletext.css';
import utilStyles from './styles/util.css';

const SampleText = ({
  isLoaded,
  sampleText,
  error,
  isStarted,
  errorIndexes,
  lastChar,
}) => {
  if (error) {
    return (
      <p className={utilStyles.error}>
        Ошибка:
        {' '}
        {error.message}
      </p>
    );
  }

  if (!isLoaded) {
    return (
      <p className={styles.sampletext}>
        Загрузка...
      </p>
    );
  }

  return (
    <>
      <h2 className={utilStyles.visuallyHidden}>Main text for your training</h2>
      <p className={styles.sampletext}>
        {[...sampleText].slice(0, lastChar).map((char, i) => (
          <Char
            key={i}
            isStarted={isStarted}
            char={char}
            state={errorIndexes.includes(i) ? 'error' : 'success'}
          />
        ))}
        {[...sampleText].slice(lastChar, sampleText.length).map((char, i) => (
          <Char
            key={i}
            isStarted={isStarted}
            char={char}
            state="default"
          />
        ))}
      </p>
    </>
  );
};

SampleText.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  sampleText: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  isStarted: PropTypes.bool.isRequired,
  errorIndexes: PropTypes.arrayOf(PropTypes.number),
  lastChar: PropTypes.number,
};

SampleText.defaultProps = {
  errorIndexes: [],
  error: null,
  lastChar: 0,
};

export default SampleText;
