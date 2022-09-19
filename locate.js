//Not even possible to load over the network, just some code i wrote for fun
var pathfindToNearestFlower = (jeroo_id) => {
    for (var x = 0; x < jerooClass.cols; x++){
        for (var y = 0; y < jerooClass.rows; y++){
            if (tile = jerooClass.getTile(x, y), "F" == tile) {
                console.log("found flower at",y,x)
                target_jeroo = getJerooList()[jeroo_id];

                generateRoute(target_jeroo.x, target_jeroo.y, x, y, (route) => {
                    console.log('Route generated!')
                    runRoute(target_jeroo, route)
                })
                return
            }
        }
    }   
}