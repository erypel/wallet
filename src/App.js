import React from 'react'
import PrivateRoute from './client/library/PrivateRoute'
import Login from './client/container/pages/Login'
import Register from './client/container/pages/Register'
import Home from './client/container/pages/Home'
import Header from './client/component/Header'
import { Route, Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { history } from './client/utils/history'
import Wallet from './client/container/pages/Wallet'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './client/store/configureStore'
import './client/library/main.css'
import UserProfileForm from './client/container/UserProfileForm'
import NavBar from './client/container/NavBar'

const {store, persistor} = configureStore()

class App extends React.PureComponent {
  render() {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavBar/>
          <div className="App">
            <Header/>
            <Router history={history}>
              <div>
                <Switch>
                  <PrivateRoute exact path="/" exact component={Home}/>
                  <PrivateRoute path="/home" exact component={Home}/>
                  <Route path="/login" exact component={Login}/>
                  <Route path='/register' component={Register}/>
                  <PrivateRoute path='/wallet/:publicKey' component={Wallet}/>
                  <PrivateRoute path='/profile' component={UserProfileForm}/>
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
