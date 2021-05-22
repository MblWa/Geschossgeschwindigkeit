import * as React from 'react';
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

export default TestField;
