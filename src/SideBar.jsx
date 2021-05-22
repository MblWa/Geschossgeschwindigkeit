import * as React from 'react';
import ResultCard from './ResultCard';
import styles from './styles/sidebar.css';
import utilStyles from './styles/util.css';

const SideBar = ({ speed, accuracy, time, triggerStartAgain, errorCount }) => (
  <div className={styles.sidebar}>
    <h2 className={utilStyles.visuallyHidden}>Typing Features</h2>
    <ResultCard
      cardName="Speed"
      cardValue={speed}
      additionalText=" sym/min"
    />
    <ResultCard
      cardName="Accuracy"
      cardValue={accuracy}
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
      onClick={() => triggerStartAgain()}
    >
      Start new try
    </button>
  </div>
);

export default SideBar;
