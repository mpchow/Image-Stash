import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './Components/Login/login';
import Dashboard from './Components/Dashboard/dashboard';

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
