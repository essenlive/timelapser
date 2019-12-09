const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const timeLoop = require('./timeLoop.js')
const pad = require('pad-number');
const createTimelapse = require('./createTimelapse.js')
const board = new five.Board({
    io: new Raspi(),
    repl: false
});
let hold = false;
let id = 0;

let options = [
    {
        name:"day",
        value : 0,
        bounds: [0,7],
        pos: [0,6]
    },
    {
        name:"hour",
        value : 0,
        bounds: [0,23],
        pos: [0,9]
    },
    {
        name:"minute",
        value : 2,
        bounds: [0,59],
        pos: [0,12]
    },
    {
        name:"second",
        value : 0,
        bounds: [0,59],
        pos: [0,15]
    },
    {
        name:"lapseMinute",
        value : 0,
        bounds: [0,59],
        pos: [1,7]
    },
    {
        name:"lapseSeconde",
        value : 5,
        bounds: [0,59],
        pos: [1,10]
    },
    {
        name:"start",
        value : 0,
        bounds: [0,1],
        pos: [1,13]
    }
]


board.on('ready', () => {
    // Create a new `button` hardware instance.
    const buttonA = new five.Button(0);
    const buttonB = new five.Button(2);
    const lcd = new five.LCD({
        controller: "PCF8574T",
        rows: 2,
        cols: 16
    });
    
 // lcd.print("----------------                        ----------------");
    const refresh = async(options, id)=>{
        lcd.clear();
        lcd.print(`time ${pad(options[0].value, 2)}d${pad(options[1].value, 2)}h${pad(options[2].value, 2)}m${pad(options[3].value, 2)}                        lapse ${pad(options[4].value, 2)}m${pad(options[5].value, 2)}s >GO`);
        lcd.cursor(options[id].pos[0], options[id].pos[1]);
        // console.log(options);
        if(options[6].value===1){
            let duration = options[0].value * 24 * 60 * 60 * 1000 
            + options[1].value * 60 * 60 * 1000 
            + options[2].value * 60 * 1000 
            + options[3].value * 1000;
            let lapse = options[4].value * 60 * 1000 
            + options[5].value * 1000;
            console.log(`-----------------------------------`);
            console.log(`Timelapse started : ${new Date()}`);
            console.log(`Duration : ${duration / 1000} seconds`);
            console.log(`Number of frames : ~ ${duration / lapse}`);
            lcd.clear();
            lcd.print("----------------                        ----------------");
            let photos = await timeLoop(duration, lapse)
            lcd.print("Building                                Timelapse       ");
            lcd.clear();
            console.log(`Buildng Timelapse started`);
            try {
                let result = await createTimelapse(photos);
                console.log(result);
            } catch (error) {
                console.log(error)
            }
        }


    }

    const reMap = (v, b)=>{
        if(v < b[0]){return b[1]}
        if(v > b[1]){return b[0]}
        return v
    }
    refresh(options, id);


    buttonA.on("hold", function () {
        id++; id = reMap(id, [0, options.length -1]);
        refresh(options, id);
        hold = true;
        
    });
    buttonB.on("hold", function () {
        id--;
        id = reMap(id, [0, options.length -1]);
        refresh(options, id);
        hold = true;
        
    });
    
    
    buttonA.on("release", function () {
        if(hold){hold = false; return}
        options[id].value++;
        options[id].value = reMap(options[id].value, options[id].bounds);
        refresh(options, id);
        
    });
    buttonB.on("release", function () {
        if(hold){hold = false; return}
        options[id].value--;
        options[id].value = reMap(options[id].value, options[id].bounds);
        refresh(options, id);
        
    });


});
