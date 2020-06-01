const state = {
    pictures : {
        frames : [],
        interval : null,
        initialized : false,
        dir: './photos',
        start : new Date()
    },
    timelapse: null,
    upload: null,
    error: "+---",
    setup: {
        options : {
            hours: {
                value: 0,
                bounds: [0, 23],
                cursor : [1,8]
            },
            minutes: {
                value: 5,
                bounds: [0, 59],
                cursor: [1, 11]
            },
            seconds: {
                value: 0,
                bounds: [0, 59],
                cursor: [1, 14]
            }
        },
        selection : 'hours'
    }
}
    
module.exports = state;