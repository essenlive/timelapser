const pad = require('pad-number');
const LCD = require('./LCD.js');
const rebound = require('./utils/rebound.js');


const routes = {
    setup: {
        controls: {
            a: {
                release: () => {
                    LCD.route("startConfirmation")
                },
                hold: () => {
                    LCD.route("pictures")
                }
            },
            b: {
                release: () => {
                    let state = LCD.state;
                    let value = state.setup.options[LCD.state.setup.selection].value + 1;
                    value = rebound(value, state.setup.options[LCD.state.setup.selection].bounds);
                    state.setup.options[LCD.state.setup.selection].value = value;
                    LCD.setState(state)
                },
                hold: () => {
                    let state = LCD.state;
                    let options = Object.keys(LCD.state.setup.options);
                    let index = options.indexOf(LCD.state.setup.selection) + 1;
                    index = rebound(index, [0, options.length - 1]);
                    state.setup.selection = options[index];
                    LCD.setState(state)
                }
            },
            c: {
                release: () => {
                    let state = LCD.state;
                    let value = state.setup.options[LCD.state.setup.selection].value - 1;
                    value = rebound(value, state.setup.options[LCD.state.setup.selection].bounds);
                    state.setup.options[LCD.state.setup.selection].value = value;
                    LCD.setState(state)
                },
                hold: () => {
                    let state = LCD.state;
                    let options = Object.keys(LCD.state.setup.options);
                    let index = options.indexOf(LCD.state.setup.selection) - 1;
                    index = rebound(index, [0, options.length - 1]);
                    state.setup.selection = options[index];
                    LCD.setState(state)
                }
            }
        },
        init: () => {
        },
        render: () => {
            return {
                cursor: LCD.state.setup.options[LCD.state.setup.selection].cursor,
                lines: [
                    `SETUP`,
                    `LAPSES ${pad(LCD.state.setup.options.hours.value, 2)}h${pad(LCD.state.setup.options.minutes.value, 2)}m${pad(LCD.state.setup.options.seconds.value,2)}s`
                ]
            }
        }
    },
    pictures: {
        controls: {
            a: {
                release: () => {
                    LCD.route('buildConfirmation')
                },
                hold: () => {}
            },
            b: {
                release: () => { },
                hold: () => { }
            },
            c: {
                release: () => {},
                hold: () => { }
            }
        },
        init: () => {

            let state = LCD.state;
            let lapse = state.setup.options["hours"].value * 60 * 60 * 1000
                + state.setup.options["minutes"].value * 60 * 1000
                + state.setup.options["seconds"].value * 1000;
            if (state.pictures.interval) return
            state.pictures.start = new Date()
            state.pictures.interval = setInterval(() => {
                // let data = await takePicture(photos.length);
                state.pictures.frames.push('0');
                LCD.setState(state);
                
            }, lapse - 5000 < 0 ? 0 : lapse - 6000)
        },
        render: () => {
            return {
                cursor: null,
                lines: [
                    `TAKING PICTURES`,
                    `${pad(LCD.state.pictures.start.getDate(), 2)}/${pad(LCD.state.pictures.start.getMonth() + 1, 2)} ${pad(LCD.state.pictures.start.getHours() + 1, 2)}:${pad(LCD.state.pictures.start.getMinutes(), 2)} ${pad(LCD.state.pictures.frames.length,4)}`
                ]
            }
        }
    },
    startConfirmation: {
        controls: {
            a: {
                release: () => {
                    LCD.route("pictures")
                },
                hold: () => { }
            },
            b: {
                release: () => {
                    LCD.route("setup")},
                hold: () => { }
            },
            c: {
                release: () => {
                    LCD.route("setup")
                },
                hold: () => { }
            }
        },
        init: () => {
        },
        render: () => {
            return {
                cursor: null,
                lines: [
                    `PRESS AGAIN TO`,
                    `START`
                ]
            }
        }
    },
    buildConfirmation: {
        controls: {
            a: {
                release: () => {
                    if (LCD.state.pictures.interval) clearInterval(LCD.state.pictures.interval);
                    LCD.state.pictures.interval = null;
                    LCD.setState(LCD.state)
                    LCD.route("build")
                },
                hold: () => {
                    LCD.route("pictures")}
            },
            b: {
                release: () => { },
                hold: () => { }
            },
            c: {
                release: () => { },
                hold: () => { }
            }
        },
        init: () => {
        },
        render: () => {
            return {
                cursor: null,
                lines: [
                    `PRESS TO BUILD`,
                    `LONG TO CONTINUE`
                ]
            }
        }
    },
    build: {
        controls: {
            a: {
                release: () => {
                },
                hold: () => { }
            },
            b: {
                release: () => { },
                hold: () => { }
            },
            c: {
                release: () => { },
                hold: () => { }
            }
        },
        init: () => {
            setTimeout(() => {
                LCD.route("upload")
            }, 3000)
        },
        render: () => {
            return {
                cursor: null,
                lines: [
                    `BUILDING`,
                    `TIMELAPSE`
                ]
            }
        },
    },
    upload: {
        controls: {
            a: {
                release: () => {
                    LCD.route("setup")
                },
                hold: () => { }
            },
            b: {
                release: () => { },
                hold: () => { }
            },
            c: {
                release: () => { },
                hold: () => { }
            }
        },
        init: () => {
        },
        render: () => {
            return {
                cursor: null,
                lines: [
                    `UPLOADING`,
                    `TIMELAPSE`
                ]
            }
        }
    }
}

module.exports = routes