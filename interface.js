const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const lcdInterface = require('./lcdInterface.js')
let state = require('./state.js')
let hold = false;


const board = new five.Board({
    io: new Raspi(),
    repl: false
});


board.on('ready', () => {

    const lcd = new five.LCD({
        controller: "PCF8574T",
        rows: 2,
        cols: 16
    });
    const buttonA = new five.Button(0);
    const buttonB = new five.Button(2);
    const buttonC = new five.Button(3);

    
    const refresh = (state) => {
        lcd.clear();
        console.log("-------------------");
        console.log(state.view);
        let view = lcdInterface[state.view.step].view(state);
        console.log(view);
        let line1 = `${view.render[0]}                `.substring(0, 16);
        let line2 = `${view.render[1]}                `.substring(0, 16);
        lcd.print(`${line1}                        ${line2}`);
        lcd.cursor(0, 20);
        if(view.cursor !== null){
            lcd.cursor(view.cursor[0], view.cursor[1]);
        }
    }

    refresh(state);
    
    buttonA.on("release", ()=>{
        if(hold){hold = false; return}
        refresh(lcdInterface[state.view.step].controls.a.release(state))
    });

    buttonA.on("hold", () => {
        refresh(lcdInterface[state.view.step].controls.a.hold(state));
        hold = true;
    });

    buttonB.on("release", ()=>{
        if (hold) { hold = false; return }
        refresh(lcdInterface[state.view.step].controls.b.release(state))
    });

    buttonB.on("hold", ()=>{
        refresh(lcdInterface[state.view.step].controls.b.hold(state));
        hold = true;
    });

    buttonC.on("release", () => {
        if (hold) { hold = false; return }
        refresh(lcdInterface[state.view.step].controls.c.release(state))
    });

    buttonC.on("hold", () => {
        refresh(lcdInterface[state.view.step].controls.c.hold(state));
        hold = true;
    });


});
