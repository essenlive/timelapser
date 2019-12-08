const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const board = new five.Board({
    io: new Raspi(),
    repl: false
});



board.on('ready', () => {
    // Create a new `button` hardware instance.
    const buttonA = new five.Button(0);
    const buttonB = new five.Button(2);
    const lcd = new five.LCD({
        controller: "PCF8574T",
        rows: 2,
        cols: 12
    });
    console.log(lcd);
    

    buttonA.on("hold", function () {
        lcd.clear();
        
    });
    
    
    buttonB.on("press", function () {
        lcd.print("B pressed");

        // lcd.useChar("heart");
        // lcd.print(":heart:");
    });


});
