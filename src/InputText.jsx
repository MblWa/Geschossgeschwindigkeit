import * as React from 'react';
import styles from './styles/inputtext.css';

const InputText = ({ userText, handleUserInput, isLoaded, error }) => (
  <textarea
    type="text"
    className={styles.inputtext}
    placeholder="Type here to start test"
    value={userText}
    disabled={(isLoaded && !error) ? '' : 'disabled'}
    onChange={(evt) => handleUserInput(evt.target.value)}
  />
);

export default InputText;
