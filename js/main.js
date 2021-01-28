// Global Vars
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM Elements
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photos = document.getElementById("photos");
const photoButton = document.getElementById("photo-button");
const clearButton = document.getElementById("clear-button");
const photoFilter = document.getElementById("photo-filter");

// Get media stream
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        // Link to the video source
        video.srcObject = stream;
        // Play Video
       video.play();
    })
    .catch(err => {
        console.error(`Error: ${err}`);
    });
video.addEventListener('canplay', e => {
    // Play when ready
    if (!streaming) {
        // Set video / canvas height
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
    }
}, false);

photoButton.addEventListener('click', e => {
   takePicture();

   e.preventDefault();
});

function takePicture() {
    // Create Canvas
    const context = canvas.getContext('2d');

    if (width && height) {
        // set canvas props
        canvas.width = width;
        canvas.height = height;

        // Draw an image of the video on the canvas
        context.drawImage(video, 0, 0, width, height);

        // Create image from the canvas
        const imgUrl = canvas.toDataURL('image/png');

        // Create img element
        const img = document.createElement('img');

        // Set img src
        img.setAttribute('src', imgUrl);

        // Add image to photos
        photos.appendChild(img);
    }
}
