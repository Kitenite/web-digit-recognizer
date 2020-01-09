import React, {useState, useRef} from 'react';
import SignatureCanvas from 'react-signature-canvas'


export default function DrawingCanvas(){
  const sigCanvas = useRef({});
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url
  const clearPad = () => {sigCanvas.current.clear()}
  const submitPad = () => console.log(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  const canvasWidth =  Math.min(window.innerHeight, window.innerWidth)/2;
  const brushSize = (canvasWidth/30).toString(10);
  return(
    <div>
      <SignatureCanvas
            ref = {sigCanvas}
            penColor='black'
            velocityFilterWeight='0'
            maxWidth= {brushSize}
            dotSize='0'
            canvasProps={{
              width: canvasWidth,
              height: canvasWidth,
              className: 'signatureCanvas'
            }} />
      <div className="button-wrapper">
        <button className="button" onClick={clearPad}>clear</button>
        <button className="button" onClick={submitPad}>submit</button>
      </div>
    </div>
  )
}
