const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const board = new five.Board({
    io: new Raspi()
});

board.on('ready', () => {


    new five.LCD({
        controller: "PCF8574T"
    });
    lcd.print("Hello");


});