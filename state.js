
let state = {
    view : {
        step : "connection",
        status : "available",
        setting : "days"
    },
    pictures : {
        frames : [],
        interval : null
    },
    setup: {
        days: {
            value: 0,
            bounds: [0, 7]
        },
        hours: {
            value: 0,
            bounds: [0, 23]
        },
        minutes: {
            value: 2,
            bounds: [0, 59]
        },
        seconds: {
            value: 0,
            bounds: [0, 59]
        },
        lapseMinutes: {
            value: 0,
            bounds: [0, 59],
        },
        lapseSeconds : {
            value: 10,
            bounds: [0, 59],
        }
    }
}


module.exports = state;