
import Grid from './components/Grid';
import styles from './App.module.scss';

function App() 
{
  return (
    <div className={styles.wrapper}>
      <h1>Tic Tac Toe</h1>
      <Grid />
    </div>
  );
}

export default App;
