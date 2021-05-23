import * as React from 'react';
import Header from './Header';
import Board from './Board';

const URL = 'https://baconipsum.com/api/?type=all-meat&paras=1';
const DEFAULT_APP_STATE = {
  error: null,
  isLoaded: false,
  sampleText: '',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_APP_STATE;

    this.resetLoadedText = this.resetLoadedText.bind(this);
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

  resetLoadedText() {
    this.setState(DEFAULT_APP_STATE);
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
    const { error, isLoaded, sampleText } = this.state;
    return (
      <>
        <Header />
        <Board
          error={error}
          isLoaded={isLoaded}
          sampleText={sampleText}
          resetLoadedText={this.resetLoadedText}
        />
      </>
    );
  }
}

export default App;
