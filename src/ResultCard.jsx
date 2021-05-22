import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './styles/resultcard.css';

const ResultCard = ({ cardName, cardValue, additionalText }) => (
  <div>
    <h3 className={styles.resultcard}>{cardName}</h3>
    <p className={styles.resultcard__highlight}>
      {cardValue}
      {additionalText}
    </p>
  </div>
);

ResultCard.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardValue: PropTypes.number.isRequired,
  additionalText: PropTypes.string,
};

ResultCard.defaultProps = {
  additionalText: '',
};

export default ResultCard;
