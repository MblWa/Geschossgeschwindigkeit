import * as React from 'react';
import * as PropTypes from 'prop-types';
import TestField from './TestField';
import SideBar from './SideBar';
import findErrors from './stringUtils';
import styles from './styles/board.css';
import utilStyles from './styles/util.css';

const GAME_ROUND_TIME_LIMIT = 5; // In Seconds
const TIMER_STEP = 1000; // In Miliseconds
const TIMER_LOOP_INTERVAL = 100; // In Miliseconds
const DEFAULT_BOARD_STATE = {
  userText: '',
  isStarted: false,
  time: GAME_ROUND_TIME_LIMIT,
  timerID: null,
  errorIndexes: [],
  isFinished: false,
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_BOARD_STATE;

    this.handleUserInput = this.handleUserInput.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.restart = this.restart.bind(this);
  }

  handleUserInput(input) {
    const { isStarted } = this.state;
    const { sampleText } = this.props;
    const inputLength = input.length;
    const errorIndexes = findErrors(sampleText, input);

    this.setState({
      userText: input,
      errorIndexes,
      isFinished: inputLength >= sampleText.length,
    });

    if (!isStarted) {
      this.startTimer();
    }
  }

  startTimer() {
    let startingTime = Date.now();

    const timer = setInterval(() => {
      const { time, isFinished } = this.state;
      const timeDifference = Math.floor((Date.now() - startingTime) / TIMER_STEP);

      if (timeDifference >= 1 && !isFinished) {
        startingTime += TIMER_STEP;
        this.setState((state) => ({ time: state.time - timeDifference }));
      }
      if (time <= 0) {
        clearInterval(timer);
      }
    }, TIMER_LOOP_INTERVAL);

    this.setState({
      isStarted: true,
      timerID: timer,
    });
  }

  restart() {
    const { timerID } = this.state;
    const { resetLoadedText } = this.props;

    clearInterval(timerID);
    resetLoadedText();
    this.setState(DEFAULT_BOARD_STATE);
  }

  render() {
    const {
      userText,
      time,
      isFinished,
      isStarted,
      errorIndexes,
    } = this.state;
    const {
      isLoaded,
      sampleText,
      error,
    } = this.props;

    const errorCount = errorIndexes.length;
    const inputLength = userText.length;
    const accuracy = (inputLength === 0)
      ? 100
      : Math.trunc(((inputLength - errorCount) / inputLength) * 100);
    const speed = Math.trunc(((inputLength - errorCount)
                  / (GAME_ROUND_TIME_LIMIT - time + 1)) * 60);

    return (
      <main className={styles.board}>
        <h1 className={utilStyles.visuallyHidden}>
          Geschossgeschwindigkeit - is the best way to learn typing fast
        </h1>
        {(time > 0 && !isFinished)
          ? (
            <TestField
              isLoaded={isLoaded}
              sampleText={sampleText}
              error={error}
              userText={userText}
              isStarted={isStarted}
              errorIndexes={errorIndexes}
              handleUserInput={this.handleUserInput}
            />
          )
          : <div className={styles.board__gameover}>Finish!</div>}
        <SideBar
          speed={speed}
          accuracy={accuracy}
          time={time}
          errorCount={errorCount}
          restart={this.restart}
        />
      </main>
    );
  }
}

Board.propTypes = {
  resetLoadedText: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  sampleText: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
};

Board.defaultProps = {
  error: null,
};

export default Board;
