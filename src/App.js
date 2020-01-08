import React from 'react';
import logo from './logo.svg';
import './App.css';
import SketchPad from './components/SketchPad'


function App() {
  return (
    <div className="App">
      <h1>Draw any digit from 0-9</h1>
      <SketchPad/>
      <div className="button-wrapper">
        <button className="button">clear</button>
        <button className="button">submit</button>
      </div>

      <style jsx>{`
        .App{
          text-align: center;
        }
        .button-wrapper{
          padding-top: 5vh;
        }
        `}</style>
    </div>
  );
}

export default App;
