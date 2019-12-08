const takePicture = require('./takePicture.js')
const createTimelapse = require('./createTimelapse.js')
const sleep = require('util').promisify(setTimeout)

// Settings to be defined manually later on
let duration = [0,0,5,0];
let lapse = 500;
let imageWidth = 1280;
let imageHeight = 720;

// global variables
let photos = [];
const startTime = new Date();
duration = duration[0] * 24 * 60 * 60 * 1000 
+ duration[1] * 60 * 60 * 1000 
+ duration[2] * 60 * 1000 
+ duration[3] * 1000;

console.log(`-----------------------------------`);
console.log(`Timelapse started : ${new Date()}`);
console.log(`Duration : ${duration / 1000} seconds`);
console.log(`Number of frames : ~ ${duration / lapse}`);

// Timelapse Loop
(async()=>{
    
    while (new Date() - startTime <= duration  ){
        console.log(`-----------------------------------`);
        console.log(`Photo number : ${photos.length + 1} `);
        console.log(`Elapsed time: ${(new Date() - startTime) / 1000 } seconds`);
        try {    
            let data = await takePicture(imageWidth, imageHeight, photos.length);
            photos.push(data);
            console.log(data);
        } catch (error) {
            console.log(error)            
        }
        await sleep(lapse)
        console.log('waited');
    }
    console.log(`-----------------------------------`);
    console.log(`Timelapse started`);
    try {
        let result = await createTimelapse(imageWidth, imageHeight, photos);
        console.log(data);
    } catch (error) {
        console.log(error)
    }

})();



