import React, { Component } from 'react';

import './App.css';
import MapContainer from './components/map/map.container'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to Speedline Solutions evaluation project
          </p>
        </header>
        <MapContainer />
      </div>
    );
  }
}

export default App;
