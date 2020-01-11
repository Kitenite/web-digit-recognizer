import React from 'react';

const ImageProcessor = (img) => {
  //Scale image
  const scale = Math.min(20/img.width, 20/img.height);
  const canvas = document.createElement('canvas');
  canvas.width = 28;
  canvas.height = 28;
  const cctx = canvas.getContext('2d');
  cctx.imageSmoothingEnabled = true;

  const scaled_width = img.width*scale;
  const scaled_height = img.height*scale;
  const dx = (28 - scaled_width)/2;
  const dy = (28 - scaled_height)/2;
  cctx.drawImage(img, dx, dy, scaled_width, scaled_height);


  // invert colors, make black and white and remove alpha
  var imgData = cctx.getImageData(0, 0, canvas.width, canvas.height);
  var i;
  for (i = 0; i < imgData.data.length; i += 4) {
    if (imgData.data[i + 3] > 0){
      imgData.data[i] = 255;
      imgData.data[i+1] = 255;
      imgData.data[i+2] = 255;
    } else {
      imgData.data[i] = 0;
      imgData.data[i+1] = 0;
      imgData.data[i+2] = 0;
    }
    imgData.data[i + 3] = 255;
  }
  cctx.putImageData(imgData, 0, 0);

  let newImage = canvas;
  return newImage;
}



export default ImageProcessor;
