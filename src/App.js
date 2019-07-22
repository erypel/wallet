import React from 'react'
import './App.css'
import PrivateRoute from './client/library/PrivateRoute'
import Login from './client/pages/Login'
import Register from './client/pages/Register'
import Wallet from './client/pages/Wallet'
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { LoginStore } from './client/redux/store/LoginStore'
import { history } from './client/utils/history'

class App extends React.PureComponent {

  render() {
    return <Provider store={LoginStore}>
        <div className="App">
          <Router history={history}>
            <div>
              <Switch>
                <PrivateRoute path="/" exact component={Wallet}/>
                <Route path="/login" exact component={Login}/>
                <Route path='/register' component={Register}/>
                <PrivateRoute path='/wallet' component={Wallet}/>
                <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
  }
}

export default App;
