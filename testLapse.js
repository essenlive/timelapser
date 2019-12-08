const createTimelapse = require('./createTimelapse.js')

let imageWidth = 1280, imageHeight = 720;
let photos = [
    "./photos/img-0000.jpg",
    "./photos/img-0001.jpg",
    "./photos/img-0002.jpg",
    "./photos/img-0003.jpg",
    "./photos/img-0004.jpg",
    "./photos/img-0005.jpg",
    "./photos/img-0006.jpg",
];

(async () => {
    try {
        let result = await createTimelapse(imageWidth, imageHeight, photos);
        console.log(data);
    } catch (error) {
        console.log(error)
    }
})();

