import * as React from 'react';
import * as PropTypes from 'prop-types';
import TestField from './TestField';
import SideBar from './SideBar';
import styles from './styles/board.css';
import utilStyles from './styles/util.css';

const GAME_ROUND_TIME_LIMIT = 60; // In Seconds
const TIMER_STEP = 1000; // In Miliseconds
const TIMER_LOOP_INTERVAL = 100; // In Miliseconds
const DEFAULT_BOARD_STATE = {
  userTextIndex: 0,
  isStarted: false,
  time: GAME_ROUND_TIME_LIMIT,
  timerID: null,
  errorIndex: null,
  errorCount: 0,
  isFinished: false,
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_BOARD_STATE;
    this.autofocusTimerId = null;

    this.startTimer = this.startTimer.bind(this);
    this.restart = this.restart.bind(this);
    this.focusedElement = React.createRef();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.autofocusTimerId = setInterval(() => {
      const { time, isFinished } = this.state;

      if (!isFinished && time > 0) {
        this.focusedElement.current.focus();
      } else {
        clearInterval(this.autofocusTimerId);
      }
    }, TIMER_LOOP_INTERVAL);
  }

  handleKeyPress(input) {
    const { isStarted, errorIndex, userTextIndex } = this.state;
    const { sampleText } = this.props;

    if (sampleText[userTextIndex] !== input) { // Validates last char
      if (errorIndex !== userTextIndex) { // If not the same mistake
        this.setState((state) => ({
          errorCount: state.errorCount + 1,
          errorIndex: userTextIndex,
        }));
      }
    } else {
      this.setState((state) => ({
        errorIndex: null,
        userTextIndex: state.userTextIndex + 1,
        isFinished: userTextIndex === sampleText.length - 1,
      }));
    }

    if (!isStarted) {
      this.startTimer();
    }
  }

  startTimer() {
    let startingTime = Date.now();

    const timer = setInterval(() => {
      const { time, isFinished } = this.state;
      const timeDifference = Math.floor((Date.now() - startingTime) / TIMER_STEP);

      if (timeDifference >= 1 && !isFinished && time > 0) {
        startingTime += TIMER_STEP;
        this.setState((state) => ({
          time: (state.time - timeDifference >= 0) ? state.time - timeDifference : 0,
        }));
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
      userTextIndex,
      time,
      isFinished,
      isStarted,
      errorIndex,
      errorCount,
    } = this.state;
    const {
      isLoaded,
      sampleText,
      error,
    } = this.props;

    const accuracy = (userTextIndex === 0 || userTextIndex - errorCount < 0)
      ? 0
      : Math.round(((userTextIndex - errorCount) / userTextIndex) * 100);
    const speed = (time === GAME_ROUND_TIME_LIMIT)
      ? Math.round((userTextIndex / (GAME_ROUND_TIME_LIMIT - time + 1)) * 60)
      : Math.round((userTextIndex / (GAME_ROUND_TIME_LIMIT - time)) * 60);

    return (
      <div
        className={styles.board}
        tabIndex={0}
        onKeyPress={(evt) => this.handleKeyPress(evt.key)}
        ref={this.focusedElement}
        role="textbox"
      >
        <h1 className={utilStyles.visuallyHidden}>
          Geschossgeschwindigkeit - is the best way to learn typing fast
        </h1>
        {(time > 0 && !isFinished)
          ? (
            <TestField
              isLoaded={isLoaded}
              sampleText={sampleText}
              error={error}
              userTextIndex={userTextIndex}
              isStarted={isStarted}
              errorIndex={errorIndex}
            />
          )
          : <div className={styles.board__gameover}>das Finish!</div>}
        <SideBar
          speed={speed}
          accuracy={accuracy}
          time={time}
          errorCount={errorCount}
          restart={this.restart}
        />
      </div>
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
