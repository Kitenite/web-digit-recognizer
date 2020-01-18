## Introduction

This project is a handwritten digit classifier with a React front-end and AWS/Docker backend. The model was developed using Tensorflow and served using Tensorflow Serving.

Languages: Javascript, HTML, CSS, Python
Frameworks: React.js, Express.js, Node.js
Environments: AWS EC2, Docker

There are 3 components to the digit recognizer. Each I learned through doing this project
1. The model
2. The client
3. The server

This blog post is a walkthrough of my process of developing this project. Mostly for personal record keeping but also to showcase the way I personally solve problems. So without further delay, here was my process:

## The model

For building and training the model, I used Tensorflow. In my opinion, it’s a very beginner-friendly tool for people like me without a ton of data science experience.

https://www.tensorflow.org/learn


Instead of having to manually build out your own model, Tensorflow allows for a level of abstraction by letting you simply input what the shape of your model is. An example model creation can be seen below with the bolded part being customizable.

> Tensorflow code

In this case I am creating a model with 1 hidden layer, an input layer that takes in a matrix of 28x28 and outputs 10 different classification. We can see why in a little bit.
So what I wanted to do is create model that takes in handwritten digit and tell me what the corresponding number is. This project is loosely based on the tensorflow clothing classfication tutorial that can be found here:

https://www.tensorflow.org/tutorials/keras/classification


The dataset that I want to use is the MNIST handwriting dataset.

http://yann.lecun.com/exdb/mnist/


We can see from the image description that the images are formatted by 28x28 matrix of pixels, which is why we’d want our input to be 28 by 28. Next, all we needed to do was load and run the model. The test output gives us an accuracy of 88%, which is good enough for the amount of data and training we had.

> Test accuracy

## The client

For the client, I used React.js to create my own client. I learned through playing around with their Tic-tac-toe tutorial and created my own drawing pad using actual simulated pixels which can be found here:
React logo
Pixel board: https://github.com/Kitenite/pixel_board

React tutorial: https://reactjs.org/tutorial/tutorial.html


After I’ve gotten comfortable with React, I continued by implementing a simple drawing pad.
Drawing pad
The problem is the drawings created will be so different from the input sizes of tensorflow so I need to size the images according to the MNIST dataset specifications. The code for this is here:

https://github.com/Kitenite/web-digit-recognizer/blob/master/src/components/ImageProcessor.js


The resizing involed compressing the image to 20x20, put 8px buffer our the image to center it by weight, convert it to black and white and invert that color. Here is the side-by-side comparison.

Comparison of processed image and MNIST image

Pretty good. Conversely, we can also train the model on a larger set of images of different ranges which makes for a much more versatile model. But that’s another project for another day. We’ll save this image and feed it to the client.

> Image result

It works!

## The Server

Now that we have the client, we need something for it to talk to. The more challenging way to do this is probably to deploy a production server and make API calls to it. I opted for this route as I wanted to learn more about AWS and Docker. We will use a Docker image provided by tensorflow called Tensorflow Serving which manages the model lifecycle and provides us with a neat REST Api to work with. More information on it can be found here:

https://www.tensorflow.org/tfx/guide/serving


I also had to learn how docker work and so here’s the link for that.

https://docs.docker.com/get-started/


So after we’ve familiarized ourselves with Docker, we want to pull the tensorflow Docker image. Let’s try to run it in our localhost.

> Docker test

Awesome. Now we use the client REST api to talk to our container.

> REST API test

Perfect. Now that our client and server talking, we can work on deploying our server.

## Deployment

I decided to host my Docker server on AWS because I’ve done work with a cloud engineer before and have always wanted to learn more about AWS. I used the EC2 service here.

https://docs.aws.amazon.com/ec2/index.html


Following the guide, I spun up a LINUX instance and ported my Docker image there. The API can now be reached at our public IP for any to access. Now all I had to do was pretty the app up with some Sketch, hook our app up to our favorite hosting site, Heroku, and watch the magic.

https://madebykiet.com/projects/digit_recognizer


And we are finally done!
(There was also 20+ hours spent trying to solve the CORS issue but nobody want to hear about that. It was fixed using a proxy server with Express.js)

## Conculsion

All in all, it the project took around 2 weeks of development time. Most of the time was spent learning how to use everything (I also was on vacation for some of it). I learned very valuable React and backend skills thanks to this project and am very excited to implement these in my next ones.

With more time, I would like to modify the AWS server to collect user input and accuracy. From that I can start building out my own MNIST dataset and train the model on those to improve it. But that’s another project for another time.
