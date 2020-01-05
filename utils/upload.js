const rp = require('request-promise');
const fs = require("fs");
const pad = require('pad-number');

const upload = (path)=>{
    let date = new Date;

    let options = {
        method: 'POST',
        uri: 'https://api.streamable.com/upload',
        auth: {
            'user': process.env.SB_USER,
            'pass': process.env.SB_PASS
        },
        formData: {
            file: {
                value: fs.createReadStream(path),
                options: {
                    filename: `${pad(date.getFullYear(), 2)}${pad(date.getMonth()+1, 2)}${pad(date.getDate(), 2)}-Timelapse.jpg`,
                    contentType: 'video/mp4'
                }
            }
        }
    };

    return new Promise((resolve, reject)=>{
        rp(options).then((body)=>{
            let res = JSON.parse(body);
            resolve(res.shortcode);
        })
        .catch(function (err) {
            reject(err)
        });

    });

}

module.exports = upload;
