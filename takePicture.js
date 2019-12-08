const Raspistill = require('node-raspistill').Raspistill;
const camera = new Raspistill();
const fs = require('fs');
const NodeWebcam = require("node-webcam");
const pad = require('pad-number');

// Check if image folder exists or create it if not
let dir = './photos';
if (!fs.existsSync(dir))fs.mkdirSync(dir);


const takePicture = (imageWidth, imageHeight,id)=>{

    // Define options
    const Webcam = NodeWebcam.create({
        width: imageWidth,
        height: imageHeight,
        quality: 100,
        delay: 0,
        saveShots: true,
        output: "jpeg",
        device: false,
        callbackReturn: "location",
        verbose: false
    });

    // camera.setOptions({
    //     width: imageWidth,
    //     height: imageHeight
    // });


    return new Promise((resolve, reject)=>{
        
        // camera.takePhoto(`img-${pad(id, 4)}`).then((photo) => {
        //     resolve(`./photos/img-${pad(id, 4)}.jpg`);
        // }).catch((err) => {
        //     reject(err)
        // });

        Webcam.capture(`./photos/img-${pad(id, 4)}.jpg`, (err, data) => {
            if (err !== null) reject(err);
            else resolve(data);
        });

    });
}

module.exports = takePicture;