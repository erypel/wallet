import React from 'react'
import './App.css'
import PrivateRoute from './client/library/PrivateRoute'
import Login from './client/pages/Login'
import Register from './client/pages/Register'
import Home from './client/pages/Home'
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { LoginStore } from './client/redux/store/LoginStore'
import { history } from './client/utils/history'
import Wallet from './client/pages/Wallet';

class App extends React.PureComponent {

  render() {
    return <Provider store={LoginStore}>
        <div className="App">
          <Router history={history}>
            <div>
              <Switch>
                <PrivateRoute path="/" exact component={Home}/>
                <PrivateRoute path="/home" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path='/register' component={Register}/>
                <PrivateRoute path='/wallet/:publicKey/:privateKey' component={Wallet}/>
                <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
  }
}

export default App;
