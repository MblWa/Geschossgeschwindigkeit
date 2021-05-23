import * as React from 'react';
import TestField from './TestField';
import SideBar from './SideBar';
import findErrors from './stringUtils';
import styles from './styles/board.css';
import utilStyles from './styles/util.css';

const URL = 'https://baconipsum.com/api/?type=all-meat&paras=1';
const TIME = 100; // In Seconds
const DEFAULT_STATE = {
  error: null,
  isLoaded: false,
  sampleText: '',
  userText: '',
  isStarted: false,
  time: TIME,
  timerID: null,
  speed: 0,
  errorIndexes: [],
  isFinished: false,
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.handleUserInput = this.handleUserInput.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      this.fetchData();
    }
  }

  handleUserInput(input) {
    const { isStarted, sampleText, time } = this.state;
    const inputLength = input.length;
    const errorIndexes = findErrors(sampleText, input);
    const errorCount = errorIndexes.length;

    this.setState({
      userText: input,
      errorIndexes,
      speed: Math.trunc(((inputLength - errorCount) / (TIME - time + 1)) * 60),
      isFinished: inputLength >= sampleText.length,
    });

    if (!isStarted) {
      this.startTimer();
    }
  }

  startTimer() {
    // Approximate value of every tick is 1 sec.
    // If more accuracy needed, should be rewritten with usage of Date.now().
    const timer = setInterval(() => {
      const { time, isFinished } = this.state;

      if (time > 0 && !isFinished) {
        this.setState((state) => ({
          time: state.time - 1,
          speed: Math.trunc(((
            state.userText.length - state.errorIndexes.length) / (TIME - time + 1)) * 60),
        }));
      } else {
        clearInterval(timer);
      }
    }, 1000);

    this.setState({
      isStarted: true,
      timerID: timer,
    });
  }

  restart() {
    const { timerID } = this.state;

    clearInterval(timerID);
    this.setState(DEFAULT_STATE);
  }

  fetchData() {
    fetch(URL)
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            sampleText: result[0].replace(/ {2,}/g, ' '), // Ответ от сервера приходит с двойными пробелами, убираем их.
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  render() {
    const {
      isLoaded,
      sampleText,
      error,
      userText,
      speed,
      time,
      isFinished,
      isStarted,
      errorIndexes,
    } = this.state;
    const errorCount = errorIndexes.length;
    const inputLength = userText.length;
    let accuracy = Math.trunc(((inputLength - errorCount) / inputLength) * 100);

    if (Number.isNaN(accuracy)) {
      accuracy = 100;
    }

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

export default Board;
