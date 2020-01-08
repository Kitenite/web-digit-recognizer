import {SketchField, Tools} from 'react-sketch';
import React from 'react';

function SketchPad(props) {
  return (
    <div className="wrapper">
      <SketchField
            className="sketch-pad"
            width='50vh'
            height='50vh'
            tool={Tools.Pencil}
            lineColor='black'
            lineWidth={20}/>
      <style jsx>{`
        .wrapper{
          padding-top: 10vh;
        }

        .sketch-pad{
          margin-left: auto;
          margin-right: auto;
          border-style: solid;
        }




        `}</style>
    </div>
  )
}

export default SketchPad
