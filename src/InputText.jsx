import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './styles/inputtext.css';

const InputText = ({
  userText,
  handleUserInput,
  isLoaded,
  error,
}) => (
  <textarea
    type="text"
    className={styles.inputtext}
    placeholder="Type here to start test"
    value={userText}
    disabled={(isLoaded && !error) ? '' : 'disabled'}
    onChange={(evt) => handleUserInput(evt.target.value)}
  />
);

InputText.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  userText: PropTypes.string,
  handleUserInput: PropTypes.func.isRequired,
};

InputText.defaultProps = {
  userText: '',
  error: null,
};

export default InputText;
