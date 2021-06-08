import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './styles/testfield.css';
import Heading from './Heading';
import SampleText from './SampleText';

const TestField = ({
  isLoaded,
  sampleText,
  error,
  userTextIndex,
  isStarted,
  errorIndex,
}) => (
  <div className={styles.testfield}>
    <Heading isStarted={isStarted} isLoaded={isLoaded} />
    <SampleText
      isLoaded={isLoaded}
      sampleText={sampleText}
      error={error}
      isStarted={isStarted}
      errorIndex={errorIndex}
      lastChar={errorIndex === null ? userTextIndex : userTextIndex + 1}
    />
  </div>
);

TestField.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  sampleText: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  userTextIndex: PropTypes.number,
  isStarted: PropTypes.bool.isRequired,
  errorIndex: PropTypes.number,
};

TestField.defaultProps = {
  userTextIndex: 0,
  errorIndex: null,
  error: null,
};

export default TestField;
