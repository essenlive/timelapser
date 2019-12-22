const pad = require('pad-number');
const takePicture = require('./takePicture.js')

let options = {
    days: [0, 6],
    hours: [0, 9],
    minutes: [0, 12],
    seconds: [0, 15],
    lapseMinutes: [1, 7],
    lapseSeconds: [1, 10],
    start: [1, 13]
}

const lcdInterface = {
    setup: {
        controls: {
            a: {
                release :  (state) => {
                    state.setup[state.view.setting].value = reMap(state.setup[state.view.setting].value + 1, state.setup[state.view.setting].bounds);
                    return state;
                },
                hold : (state) => {
                    let optionsArray = Object.keys(options);
                    let optionIndex = optionsArray.indexOf(state.view.setting);
                    state.view.setting = optionsArray[reMap(optionIndex + 1, [0, optionsArray.length - 1])];
                    return state;
                }
            },
            b: {
                release: (state) => {
                    state.setup[state.view.setting].value = reMap(state.setup[state.view.setting].value - 1, state.setup[state.view.setting].bounds);
                    return state;
                },
                hold: (state) => {
                    let optionsArray = Object.keys(options);
                    let optionIndex = optionsArray.indexOf(state.view.setting);
                    state.view.setting = optionsArray[reMap(optionIndex - 1, [0, optionsArray.length - 1])];
                    return state;
                }
            },
            c: {
                release: (state) => {
                    state.view.step = 'pictures';
                    return state;
                },
                hold: (state) => {
                    return state;
                }
            }
        },
        view: (state) => {
            return {
                cursor : options[state.view.setting],
                render : [
                    `TIME ${pad(state.setup.days.value, 2)}d${pad(state.setup.hours.value, 2)}h${pad(state.setup.minutes.value, 2)}m${pad(state.setup.seconds.value, 2)}s`,
                    `LAPSE ${pad(state.setup.lapseMinutes.value, 2)}m${pad(state.setup.lapseSeconds.value, 2)}s >GO`
                ]
            }
        }
    },
    connection: {
        controls: {
            a: {
                release: (state) => {
                    return state;
                },
                hold: (state) => {
                    return state;
                }
            },
            b: {
                release: (state) => {
                    return state;
                },
                hold: (state) => {
                    return state;
                }
            },
            c: {
                release: (state) => {
                    state.view.step = 'setup';
                    return state;
                },
                hold: (state) => {
                    return state;
                }
            }
        },
        view: (state) => {
            return {
                cursor: null,
                render: ["WAITING WIFI", "CONNECTION"]
            }
        }
    },  
    pictures: {
        controls: {
            a: {
                release: (state) => {
                    return state;
                },
                hold: (state) => {
                    return state;
                }
            },
            b: {
                release: (state) => {
                    return state;
                },
                hold: (state) => {
                    return state;
                }
            },
            c: {
                release: (state) => {
                    state.view.step = 'setup';
                    return state;
                },
                hold: (state) => {
                    return state;
                }
            }
        },
        view: (state) => {
            const lapse = state.setup.lapseMinutes.value * 60 * 1000 + state.setup.lapseSeconds.value * 1000;
            state.pictures.interval = setInterval(async() =>{
                try {
                    let data = await takePicture(state.pictures.frames.length);
                    state.pictures.frames.push(data);
                    console.log(data);
                } catch (error) {
                    console.log(error)
                }

            }, lapse - 5000 < 0 ? 0 : lapse - 6000)
            return {
                cursor: null,
                render: [
                    `Started at ${pad(new Date().getHours() + 1, 2)}:${pad(new Date().getMinutes(), 2)}`,
                    `${state.pictures.frames.length} pics taken`
                ]
            }
        }
    }
}

const reMap = (v, b) => {
    if (v < b[0]) { return b[1] }
    if (v > b[1]) { return b[0] }
    return v
}

module.exports = lcdInterface