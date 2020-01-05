require('dotenv').config()
const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const LCD = require('./LCD.js');
const routes = require('./routes.js');
const state = require('./state.js')

const board = new five.Board({io: new Raspi(), repl: false});
let hold = false;

board.on('ready', () => {

    const fiveLcd = new five.LCD({ controller: "PCF8574T" });
    const buttonA = new five.Button(0);
    const buttonB = new five.Button(2);
    const buttonC = new five.Button(3);
    
    LCD.init(fiveLcd, state, routes);
    LCD.route("setup");

    buttonA.on("release", () => {
        if (hold) { hold = false; return }
        LCD.currentRoute.controls.a.release();
    });
    buttonA.on("hold", () => {
        LCD.currentRoute.controls.a.hold();
        hold = true;
    });
    buttonB.on("release", () => {
        if (hold) { hold = false; return }
        LCD.currentRoute.controls.b.release();
    });
    buttonB.on("hold", () => {
        LCD.currentRoute.controls.b.hold();
        hold = true;
    });
    buttonC.on("release", () => {
        if (hold) { hold = false; return }
        LCD.currentRoute.controls.c.release();
    });
    buttonC.on("hold", () => {
        LCD.currentRoute.controls.c.hold();
        hold = true;
    });


});
