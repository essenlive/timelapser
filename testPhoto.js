const takePicture = require('./takePicture.js')

let id = typeof process.argv[2] === "unefined" ? 0 : process.argv[2];
let imageWidth = 1280, imageHeight = 720;


(async () => {
    try {
        let data = await takePicture(imageWidth, imageHeight, id);
        console.log(data);
    } catch (error) {
        console.log(error)
    }
})();

