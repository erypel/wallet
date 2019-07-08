import React from 'react';
import Wallet from './client/pages/Wallet'
import './App.css';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Wallet/>
      </div>
    );
  }
}
// function App() {
//   return (
//     <div className="App">
//       <p>{this.state.data}</p>
//       <Wallet/>
//     </div>
//   );
// }

export default App;
