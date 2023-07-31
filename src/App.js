import {Route, Switch, Redirect} from 'react-router-dom'
import LoginFrom from './Components/LoginForm'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginFrom} />
  </Switch>
)

export default App
