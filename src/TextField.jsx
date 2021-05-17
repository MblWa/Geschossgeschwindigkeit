import * as React from 'react';
import styles from './styles/textfield.css';
import utilStyles from './styles/util.css';

const TextField = () => (
  <div className={styles.textfield}>
    <h2 className={utilStyles.visuallyHidden}>Main text for your training</h2>
    <p className={styles.textfield__text}>
      Fugiat enim reprehenderit, elit labore officia occaecat brisket landjaeger
      ex pork adipisicing.  Rump officia non aute ut cupim.  Aliqua elit ut, pork
      shoulder kevin magna chislic do bresaola laborum.
      Laborum labore andouille, nisi pig qui rump.  Kielbasa sed mollit dolore
      short ribs.
    </p>
  </div>
);

export default TextField;
