const Raspistill = require('node-raspistill').Raspistill;
const camera = new Raspistill();
const fs = require('fs-extra');
const NodeWebcam = require("node-webcam");
const pad = require('pad-number');

// Check if image folder exists or create it if not
let dir = './photos';
if (!fs.existsSync(dir))fs.mkdirSync(dir);
(async()=>{
    await fs.emptyDir(dir)
})()

const takePicture = (id=0)=>{

    // Define options
    camera.setOptions({
        width: 1280,
        height: 720,
        rotation: 90
    });


    return new Promise((resolve, reject)=>{
        
        camera.takePhoto(`img-${pad(id, 4)}`).then((photo) => {
            resolve(`./photos/img-${pad(id, 4)}.jpg`);
        }).catch((err) => {
            reject(err)
        });

    });
}

module.exports = takePicture;