import React from 'react'
import './App.css'
import Login from './client/pages/Login'
import Register from './client/pages/Register'
import Wallet from './client/pages/Wallet'
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { LoginStore } from './client/redux/store/LoginStore'

class App extends React.PureComponent {

  render() {
    return <Provider store={LoginStore}>
        <div classname="App">
          {/* <Router>
            <Route path="/" component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/wallet' component={Wallet}/>
          </Router> */}
          <Login/>
        </div>
      </Provider>
  }
}

export default App;
