import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './styles/testfield.css';
import SampleText from './SampleText';
import InputText from './InputText';

const TestField = ({
  isLoaded,
  sampleText,
  error,
  userText,
  handleUserInput,
  isStarted,
  errorIndexes,
}) => (
  <div className={styles.testfield}>
    <SampleText
      isLoaded={isLoaded}
      sampleText={sampleText}
      error={error}
      isStarted={isStarted}
      errorIndexes={errorIndexes}
      lastChar={userText.length}
    />
    <InputText
      userText={userText}
      handleUserInput={handleUserInput}
      isLoaded={isLoaded}
      error={error}
    />
  </div>
);

TestField.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  sampleText: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  userText: PropTypes.string,
  handleUserInput: PropTypes.func.isRequired,
  isStarted: PropTypes.bool.isRequired,
  errorIndexes: PropTypes.arrayOf(PropTypes.number),
};

TestField.defaultProps = {
  userText: '',
  errorIndexes: [],
  error: null,
};
export default TestField;
