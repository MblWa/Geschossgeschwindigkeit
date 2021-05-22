import * as React from 'react';
import Char from './Char';
import styles from './styles/sampletext.css';
import utilStyles from './styles/util.css';

const SampleText = ({ isLoaded, sampleText, error, isStarted, errorIndexes, lastChar }) => {
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

export default SampleText;
