import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './styles/heading.css';

const Heading = ({ isStarted, isLoaded }) => (
  <div className={styles.heading}>
    {!isLoaded && <h2>Please wait</h2>}
    {isStarted && <h2>SCHNELLER! TYPE! TYPE! TYPE!</h2>}
    {(!isStarted && isLoaded)
      && <h2>To start your test just type the first letter of the text!</h2>}
  </div>
);

Heading.propTypes = {
  isStarted: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default Heading;
