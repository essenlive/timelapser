const LCD = {
    interface : null,
    init: (lcdObject, state={},  routes = null)=>{
        if (typeof lcdObject === "undefined") throw new Error("LCD need to be passed")
        LCD.interface = lcdObject;
        LCD.state = state;
        LCD.routes = routes;
    },
    refresh: () => {
        //Check for LCD initialization
        if (LCD.interface === null) throw new Error("LCD not initialized")

        //Get Route Render
        console.log(`ROUTE ${LCD.currentRoute.name} rendered`);
        let render = LCD.currentRoute.render();

        //Clear LCD and display route render
        LCD.interface.clear();
        let line1 = `${render.lines[0]}                `.substring(0, 16);
        let line2 = `${render.lines[1]}                `.substring(0, 16);
        LCD.interface.print(`${line1}                        ${line2}`);
        console.log(`┌----------------┐`);
        console.log(`|${line1}|`);
        console.log(`|${line2}|`);
        console.log(`└----------------┘`);
        //Display cursor if route needs to
        render.cursor === null ? LCD.interface.cursor(0, 20) : LCD.interface.cursor(render.cursor[0], render.cursor[1])
    },
    route: (route) => {
        console.log(`NEW ROUTE --> ${route}`);
        LCD.currentRoute = LCD.routes[route];
        LCD.currentRoute.name = route;
        console.log(`ROUTE ${route} initialized`) ;
        LCD.currentRoute.init();
        LCD.refresh();
    },
    currentRoute : null,
    routes : null,

    state : null,
    setState : (state)=>{
        LCD.state = state;
        LCD.refresh()
    }
}


module.exports = LCD;
