import * as React from 'react';
import SvgLogo from './SvgLogo';
import styles from './styles/header.css';

const Header = () => (
  <header className={styles.header}>
    <a href="/" className={styles.header__link} aria-label="Link to the main page">
      <SvgLogo className={styles.header__logo} />
    </a>
  </header>
);

export default Header;
