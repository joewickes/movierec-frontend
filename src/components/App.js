// Dependencies
import { Route, Switch} from 'react-router-dom';

// Styles
import './../styles/App.css';

// Components
import HomePage from './HomePage';
import NewRecPage from './NewRecPage';
import SignUpPage from './SignUpPage';
import LogInPage from './LogInPage';
import AccountPage from './AccountPage';
import RecPage from './RecPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <HomePage exact path='/' component={() => <HomePage />} />
        <Route exact path='/forms/add-rec' component={() => <NewRecPage />} />
        <Route exact path='/forms/sign-up' component={() => <SignUpPage />} />
        <Route exact path='/forms/log-in' component={() => <LogInPage />} />
        <Route exact path='/accounts/:account-id' component={() => <AccountPage />} />
        <Route exact path='/recs/:rec-id' component={() => <RecPage />} />
      </Switch>
    </div>
  );
}

export default App;
