import React from 'react';
import Wallet from './client/pages/Wallet'
import './App.css';
import { Provider } from 'react-redux';
import AddressStore from './client/redux/store/addressStore';

class App extends React.PureComponent {

  render() {
    return <Provider store={AddressStore}>
        <div className="App">
          <Wallet/>
        </div>
      </Provider>
  }
}

export default App;
