import * as React from 'react';
import * as PropTypes from 'prop-types';
import Chunk from './Chunk';
import styles from './styles/sampletext.css';
import utilStyles from './styles/util.css';

const SampleText = ({
  isLoaded,
  sampleText,
  error,
  isStarted,
  errorIndex,
  lastChar,
}) => {
  if (error) {
    return (
      <p className={utilStyles.error}>
        Error:
        {' '}
        {error.message}
      </p>
    );
  }

  if (!isLoaded) {
    return (
      <p className={styles.sampletext}>
        Loading...
      </p>
    );
  }

  return (
    <>
      <h2 className={utilStyles.visuallyHidden}>Main text for your training</h2>
      <p className={styles.sampletext}>
        {errorIndex === null
          ? (
            <Chunk
              isStarted={isStarted}
              chunk={sampleText.slice(0, lastChar)}
              state="success"
            />
          )
          : (
            <>
              <Chunk
                isStarted={isStarted}
                chunk={sampleText.slice(0, lastChar - 1)}
                state="success"
              />
              <Chunk
                isStarted={isStarted}
                chunk={sampleText.slice(lastChar - 1, lastChar)}
                state="error"
              />
            </>
          )}
        <Chunk
          isStarted={isStarted}
          chunk={sampleText.slice(lastChar, sampleText.length)}
          state="default"
        />
      </p>
    </>
  );
};

SampleText.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  sampleText: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  isStarted: PropTypes.bool.isRequired,
  errorIndex: PropTypes.number,
  lastChar: PropTypes.number,
};

SampleText.defaultProps = {
  errorIndex: null,
  error: null,
  lastChar: 0,
};

export default SampleText;
