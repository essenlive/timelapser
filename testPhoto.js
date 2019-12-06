const takePicture = require('./takePicture.js')

let imageWidth = 1280;
let imageHeight = 720;
// Timelapse Loop
(async () => {
    try {
        let data = await takePicture(imageWidth, imageHeight, 1);
        console.log(data);
    } catch (error) {
        console.log(error)
    }
})();



