import React from 'react';
import './App.css';
import Login from './client/pages/Login'
import { Provider } from 'react-redux';
import { LoginStore } from './client/redux/store/LoginStore';

class App extends React.PureComponent {

  render() {
    return <Provider store={LoginStore}>
        <div className="App">
          <Login/>
        </div>
      </Provider>
  }
}

export default App;
