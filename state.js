const state = {
    pictures : {
        frames : [],
        interval : null
    },
    setup: {
        options : {
            hours: {
                value: 0,
                bounds: [0, 23],
                cursor : [1,8]
            },
            minutes: {
                value: 0,
                bounds: [0, 59],
                cursor: [1, 11]
            },
            seconds: {
                value: 10,
                bounds: [0, 59],
                cursor: [1, 14]
            }
        },
        selection : 'hours'
    },
    data : 0
}
    
module.exports = state;