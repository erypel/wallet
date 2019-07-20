import React from 'react'
import './App.css'
import PrivateRoute from './client/library/PrivateRoute'
import Login from './client/pages/Login'
import Register from './client/pages/Register'
import Wallet from './client/pages/Wallet'
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { LoginStore } from './client/redux/store/LoginStore'

class App extends React.PureComponent {

  render() {
    return <Provider store={LoginStore}>
        <div className="App">
          <Switch>
            <PrivateRoute path="/" exact component={Wallet}/>
            <Route path="/login" exact component={Login}/>
            <Route path='/register' component={Register}/>
            <PrivateRoute path='/wallet' component={Wallet}/>
            <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
          </Switch>
        </div>
      </Provider>
  }
}

export default App;
