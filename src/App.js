import React from 'react';
import DrawingCanvas from './components/DrawingCanvas'

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <h1>Draw any digit from 0-9</h1>
        <DrawingCanvas/>
        <style >{`
          .App{
            text-align: center;
          }
          .button-wrapper{
            padding-top: 5vh;
          }
          .signatureCanvas{
            border: solid gray;
          }
          `}</style>
      </div>
    );
  }
}

export default App;
