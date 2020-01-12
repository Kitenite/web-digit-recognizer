import React from 'react';

const ImageProcessor = (img) => {
  // Scale image
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


  // Turn into 2D array of 28x28
  const image_array = Array(28);
  var column_count = 0
  var row_count = 0
  var column_array = Array(28);

  // invert colors, make black and white and remove alpha
  var imgData = cctx.getImageData(0, 0, canvas.width, canvas.height);
  var i;
  for (i = 0; i < imgData.data.length; i += 4) {

    // Fill array
    if (column_count >= 28){
      column_count = 0;
      image_array[row_count] = column_array;
      // Reset column_array
      column_array = Array(28);
      row_count++;
    }

    if (imgData.data[i + 3] > 0){
      // Used to visualize image for debugging, can be discarded
      imgData.data[i] = 255;
      imgData.data[i+1] = 255;
      imgData.data[i+2] = 255;
      // Convert to either 0 or 1
      column_array[column_count] = 1;
    } else {
      // Used to visualize image for debugging, can be discarded
      imgData.data[i] = 0;
      imgData.data[i+1] = 0;
      imgData.data[i+2] = 0;
      // Convert to either 0 or 1
      column_array[column_count] = 0;
    }
    imgData.data[i + 3] = 255;
    column_count++;
  }

  // Lazy add final row empty
  var final_row = Array(28);
  for (var i =0; i< final_row.length; i++){
    final_row[i] = 0;
  }
  image_array[27] = final_row;

  // Print out array
  console.log(image_array);

  cctx.putImageData(imgData, 0, 0);
  let newImage = canvas;
  return [newImage, image_array];
}



export default ImageProcessor;
