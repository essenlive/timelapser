const takePicture = require('./takePicture.js')
const sleep = require('util').promisify(setTimeout)

// Timelapse Loop
const timeLoop = async(duration = 30000, lapse = 2000)=>{

    // global variables
    let photos = [];
    const startTime = new Date();

    while (new Date() - startTime <= duration  ){
        console.log(`-----------------------------------`);
        console.log(`Photo number : ${photos.length + 1} `);
        console.log(`Elapsed time: ${(new Date() - startTime) / 1000 } seconds`);
        try {    
            let data = await takePicture(photos.length);
            photos.push(data);
            console.log(data);
        } catch (error) {
            console.log(error)            
        }
        await sleep(lapse - 5000 < 0 ? 0 : lapse - 6000)
        console.log('waiting');
    }
    console.log(`-----------------------------------`);
    console.log("timelapse finished");
    return photos;
}

module.exports = timeLoop;