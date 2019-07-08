import React from 'react';
import Wallet from './client/pages/Wallet'
import './App.css';

class App extends React.PureComponent {
  state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.data}</p>
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
