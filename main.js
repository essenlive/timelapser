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
    LCD.route("errorCam");
    //LCD.route("setup");

    buttonA.on("release", () => {
        if (hold) { hold = false; return }
        if (typeof (LCD.currentRoute.controls.aRelease)!=="undefined") LCD.currentRoute.controls.aRelease();
    });
    buttonA.on("hold", () => {
        if (typeof(LCD.currentRoute.controls.aHold) !== "undefined") LCD.currentRoute.controls.aHold();
        hold = true;
    });
    buttonB.on("release", () => {
        if (hold) { hold = false; return }
        if (typeof(LCD.currentRoute.controls.bRelease) !== "undefined") LCD.currentRoute.controls.bRelease();
    });
    buttonB.on("hold", () => {
        if (typeof(LCD.currentRoute.controls.bHold) !== "undefined") LCD.currentRoute.controls.bHold();
        hold = true;
    });
    buttonC.on("release", () => {
        if (hold) { hold = false; return }
        if (typeof(LCD.currentRoute.controls.cRelease) !== "undefined") LCD.currentRoute.controls.cRelease();
    });
    buttonC.on("hold", () => {
        if (typeof(LCD.currentRoute.controls.cHold) !== "undefined")LCD.currentRoute.controls.cHold();
        hold = true;
    });


});
