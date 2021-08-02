# Sense of Space A-Frame Application written by Andrei

This project consists of a simple backend service in Node.js and express 
that servers a couple of views representing the A-Frame Application.
The user can upload an image from the local storage when performing the 'upload'
action. And add a watermark to the image by performing the 'add watermark action.
Also the user can view the most recent watermarked image in a simple gallery.
When performing the 'add watermark action, the server route '/addImageWatermark 
is called, the image is stored on the server using Multer node package. The image
is then applied a watermark and overwrites the original image.


The project is hosted at:

https://sense-of-space-a-frame-application.glitch.me/


# To run the project locally

## Pre-requisites:
- node installed (e.g. version used: v14.15.1)
- npm installed (e.g. version used: 6.14.8)

## Steps:

1. Clone the repository
2. Open the command line in the project folder.
3. From the command line write the following comands in order:
```
npm i
npm start
```
4. Open your browser and go to the link displayed on the console,
e.g.:
- http://localhost:1234



