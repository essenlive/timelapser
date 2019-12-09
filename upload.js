const rp = require('request-promise');
const fs = require("fs");
const pad = require('pad-number');

const upload = (path='./photos/export.mp4')=>{
    let date = new Date;

    let options = {
        method: 'POST',
        uri: 'https://api.streamable.com/upload',
        auth: {
        'user': 'perchais.quentin@gmail.com',
        'pass': '151190'
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
            resolve(body);
        })
        .catch(function (err) {
            reject(err)
        });

    });

}

module.exports = upload;
