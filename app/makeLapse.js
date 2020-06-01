const createTimelapse = require("./utils/createTimelapse.js");
const fs = require('fs-extra');


const testFolder = './photos/';


(async()=>{

    let timelapse, frames = [];
    fs.readdirSync(testFolder).forEach(file => {
        frames.push(`./photos/${file}`);
    });
    
    try {
        timelapse = await createTimelapse(frames);
    }
    catch (error) {
        console.log(error);
    }
})()