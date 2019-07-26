import React from 'react'
import './App.css'
import PrivateRoute from './client/library/PrivateRoute'
import Login from './client/pages/Login'
import Register from './client/pages/Register'
import Home from './client/pages/Home'
import { Route, Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { history } from './client/utils/history'
import Wallet from './client/pages/Wallet'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './client/redux/store/configureStore'
import './client/library/main.css'

const {store, persistor} = configureStore()

class App extends React.PureComponent {
  render() {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Router history={history}>
              <div>
                <Switch>
                  <PrivateRoute path="/" exact component={Home}/>
                  <PrivateRoute path="/home" exact component={Home}/>
                  <Route path="/login" exact component={Login}/>
                  <Route path='/register' component={Register}/>
                  <PrivateRoute path='/wallet/:publicKey' component={Wallet}/>
                  <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
                </Switch>
              </div>
            </Router>
          </div>
        </PersistGate>
      </Provider>
  }
}

export default App
