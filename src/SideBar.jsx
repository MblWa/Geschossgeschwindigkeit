import * as React from 'react';
import styles from './styles/sidebar.css';
import utilStyles from './styles/util.css';

const SideBar = () => (
  <div className={styles.sidebar}>
    <h2 className={utilStyles.visuallyHidden}>Typing Features</h2>
    <div>
      <h3 className={styles.sidebar__feature}>Speed</h3>
      <p className={styles.sidebar__featureHighLight}> 1000 sym/min</p>
    </div>
    <div>
      <h3 className={styles.sidebar__feature}>Accuracy</h3>
      <p className={styles.sidebar__featureHighLight}> 147%</p>
    </div>
    <button type="submit" className={styles.sidebar__acceptButton}>Start new try</button>
  </div>
);

export default SideBar;
