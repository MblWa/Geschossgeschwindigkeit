import * as React from 'react';
import * as PropTypes from 'prop-types';
import ResultCard from './ResultCard';
import styles from './styles/sidebar.css';
import utilStyles from './styles/util.css';

const SideBar = ({
  speed,
  accuracy,
  time,
  restart,
  errorCount,
}) => (
  <div className={styles.sidebar}>
    <h2 className={utilStyles.visuallyHidden}>Typing Features</h2>
    <ResultCard
      cardName="Speed"
      cardValue={speed}
      additionalText=" sym/min"
    />
    <ResultCard
      cardName="Accuracy"
      cardValue={Number.isNaN(accuracy) ? 100 : accuracy}
      additionalText=" %"
    />
    <ResultCard
      cardName="Errors"
      cardValue={errorCount}
      additionalText=""
    />
    <ResultCard
      cardName="Time"
      cardValue={time}
      additionalText=" s. left"
    />
    <button
      type="submit"
      className={styles.sidebar__acceptButton}
      onClick={() => restart()}
    >
      Start new try
    </button>
  </div>
);

SideBar.propTypes = {
  speed: PropTypes.number.isRequired,
  accuracy: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired,
  errorCount: PropTypes.number.isRequired,
};

export default SideBar;
