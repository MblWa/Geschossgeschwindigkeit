import * as React from 'react';
import TextField from './TextField';
import SideBar from './SideBar';
import styles from './styles/board.css';
import utilStyles from './styles/util.css';

const Board = () => (
  <main className={styles.board}>
    <h1 className={utilStyles.visuallyHidden}>
      Geschossgeschwindigkeit - is the best way to learn typing fast
    </h1>
    <TextField />
    <SideBar />
  </main>
);

export default Board;
