console.log("pathfinding.js");

var script = document.createElement('script');
script.src = '/easystar.js';
document.head.appendChild(script);

function render_board(){
    canvas = document.getElementsByTagName('canvas')[0]
    ctx    = canvas.getContext('2d')
    jerooClass.render(ctx)
}

function getMapAsList(){
    //Create a 2D array from jerooClass.cols/rows
    var map = [];
    //Make a 2d map array using jerooClass.cols/rows and jeeroClass.getTile()
    //But flip the x and y values
    for(var y = 0; y < jerooClass.rows; y++){
        map.push([]);
        for(var x = 0; x < jerooClass.cols; x++){
            var tile = jerooClass.getTile(x, y);
            map[y].push(tile);
        }
    }           
    return map;
}

function generateRoute(startX, startY, endX, endY, callback){
    var easystar = new EasyStar.js();
    easystar.setGrid(getMapAsList());
    easystar.setAcceptableTiles(['.', 'F']);
    easystar.findPath(startX, startY, endX, endY, callback);
    easystar.calculate();
}

function runRoute(jeroo, route){
    function turn_to(direction_int){
        var current_direction = jeroo.direction;
        var turns = 0;
        while(current_direction != direction_int){
            jeroo.turn(1);
            current_direction = jeroo.direction;
            turns++;
            render_board()
        }
        return turns;
    }


    if(route.length > 0){
        var next = route.shift();
        target_direction = 0
        //Direction 0=up, 1=right, 2=down, 3=left
        if(next.y < jeroo.y){
            target_direction = 0;
        }else if(next.x > jeroo.x){
            target_direction = 1;
        }else if(next.y > jeroo.y){
            target_direction = 2;
        }else if(next.x < jeroo.x){
            target_direction = 3;
        }
        jeroo.direction = target_direction;
        render_board()

        next.x -= 1; next.y -= 1;

        setTimeout(() => {
            //If the jeroo's x is getting bigger then turn east
            jeroo.teleport(jerooClass, next.x, next.y);
            render_board();
            runRoute(jeroo, route);
        },200);
    }
}

function generateAndRun(jeroo, endX, endY){
    generateRoute(jeroo.x, jeroo.y, endY+1, endX+1, function(route){
        runRoute(jeroo, route);
    });
}
