// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const Ffmpeg = require('fluent-ffmpeg');
// Ffmpeg.setFfmpegPath(ffmpegPath);
// const ffprobePath = require('@ffprobe-installer/ffprobe').path;
// ffmpeg.setFfprobePath(ffprobePath);
const videoshow = require('videoshow')


const createTimelapse = (images)=>{

    // Define options

    const videoOptions = {
        fps: 25,
        loop: 0.2,
        transition: false,
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: "1280x720",
        audioBitrate: '128k',
        audioChannels: 2,
        format: 'mp4',
        pixelFormat: 'yuv420p'
    }

    return new Promise((resolve, reject) => {
        videoshow(images, videoOptions)
            .save('./photos/export.mp4')
            .on('start', function (command) {
                console.log('ffmpeg process started:', command)
            })
            .on('error', function (err, stdout, stderr) {
                reject(err, stdout, stderr)
            })
            .on('end', function (output) {
                resolve(output);
            })
    });
}

module.exports = createTimelapse;

