import * as React from 'react';
import styles from './styles/textfield.css';
import utilStyles from './styles/util.css';

const URL = 'https://baconipsum.com/api/?type=all-meat&paras=1';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      text: '',
    };
  }

  componentDidMount() {
    fetch(URL)
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            text: result[0],
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
    const { error, isLoaded, text } = this.state;

    if (error) {
      return (
        <div className={styles.textfield}>
          <p className={utilStyles.error}>
            Ошибка:
            {' '}
            {error.message}
          </p>
        </div>
      );
    }

    if (!isLoaded) {
      return (
        <div className={styles.textfield}>
          <p className={styles.textfield__text}>
            Загрузка...
          </p>
        </div>
      );
    }

    return (
      <div className={styles.textfield}>
        <h2 className={utilStyles.visuallyHidden}>Main text for your training</h2>
        <p className={styles.textfield__text}>
          {text}
        </p>
      </div>
    );
  }
}

export default TextField;
