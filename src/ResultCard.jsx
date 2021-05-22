import * as React from 'react';
import styles from './styles/sidebar.css';

const ResultCard = ({ cardName, cardValue, additionalText }) => (
  <div>
    <h3 className={styles.sidebar__feature}>{cardName}</h3>
    <p className={styles.sidebar__featureHighLight}>
      {cardValue}
      {additionalText}
    </p>
  </div>
);

export default ResultCard;
