import React, {useState, useRef} from 'react';
import SignatureCanvas from 'react-signature-canvas'
import ImageProcessor from './ImageProcessor'


export default function DrawingCanvas(){
  const sigCanvas = useRef({});
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  // Canvas Configuration
  const canvasWidth =  Math.min(window.innerHeight, window.innerWidth)/2;
  const brushSize = (canvasWidth/30).toString(10);

  // Functions
  const clearPad = () => {sigCanvas.current.clear()};
  const submitPad = () => {
    let submittedImage = sigCanvas.current.getTrimmedCanvas();
    let result = ImageProcessor(submittedImage)
    apiCall(result[1]);
    setImageURL(result[0].toDataURL("image/png"));
  };

  const apiCall = (image_array) => {
    var xhr = new XMLHttpRequest();
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
      let reponse = JSON.parse(xhr.responseText);
      let result_array = reponse["predictions"][0]
      console.log(result_array);
      let i = result_array.indexOf(Math.max(...result_array));
      console.log("Resulting prediction: ", i);
    });
    // open the request with the verb and the url
    xhr.open('POST', 'http://localhost:8501/v1/models/my_model:predict');
    // send the request
    xhr.send(JSON.stringify({ "instances": image_array }));
  }

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
      {imageURL ? (
        <>
          <a>Your Digit</a>
          <img
            src={imageURL}
            alt="my signature"
            style={{
              display: "block",
              margin: "0 auto",
              border: "1px solid black",
              width: "150px"
            }}
          />
        </>
      ) : null}
    </div>
  )
}
