import * as React from 'react';
import TestField from './TestField';
import SideBar from './SideBar';
import { findErrors } from './stringUtils';
import styles from './styles/board.css';
import utilStyles from './styles/util.css';

const URL = 'https://baconipsum.com/api/?type=all-meat&paras=1';
const TIME = 100;
const DEFAULT_STATE = {
  error: null,
  isLoaded: false,
  sampleText: '',
  userText: '',
  isStarted: false,
  time: TIME,
  timerID: null,
  speed: 0,
  accuracy: 100,
  errorCount: 0,
  errorIndexes: [],
  isFinished: false,
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.handleUserInput = this.handleUserInput.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.triggerStartAgain = this.triggerStartAgain.bind(this);
  }

  componentDidMount() {
    this.fechData();
  }

  componentDidUpdate() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      this.fechData();
    }
  }

  handleUserInput(input) {
    const { isStarted, sampleText, time } = this.state;
    const inputLength = input.length;
    const { errorCount, errorIndexes } = findErrors(sampleText, input);

    this.setState({
      userText: input,
      errorCount,
      errorIndexes,
      accuracy: Math.trunc(((inputLength - errorCount) / inputLength) * 100),
      speed: Math.trunc(((inputLength - errorCount) / (TIME - time + 1)) * 60),
      isFinished: inputLength >= sampleText.length,
    });

    if (!isStarted) {
      this.startTimer();
    }
  }

  startTimer() {
    this.setState({ isStarted: true });

    const timer = setInterval(() => {
      const { time, isFinished } = this.state;

      if (time > 0 && !isFinished) {
        this.setState((state) => ({
          time: state.time - 1,
          speed: Math.trunc(((state.userText.length - state.errorCount) / (TIME - time + 1)) * 60),
        }));
      } else {
        clearInterval(timer);
      }
    }, 1000);

    this.setState({ timerID: timer });
  }

  triggerStartAgain() {
    const { timerID } = this.state;

    clearInterval(timerID);
    this.setState(DEFAULT_STATE);
  }

  fechData() {
    fetch(URL)
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            sampleText: result[0].replace(/ {2,}/g, ' '), // Ответ от сервера приходит с двойными пробелами, убираем их.
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
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
      accuracy,
      time,
      isFinished,
      errorCount,
      isStarted,
      errorIndexes,
    } = this.state;

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
          triggerStartAgain={this.triggerStartAgain}
        />
      </main>
    );
  }
}

export default Board;
