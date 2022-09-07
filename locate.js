var pathfindToNearestFlower = (jeroo_id) => {
    for (var x = 0; x < jerooClass.cols; x++){
        for (var y = 0; y < jerooClass.rows; y++){
            if (tile = jerooClass.getTile(x, y), "F" == tile) {
                console.log("found flower at",y,x)
                y -= 1; x -= 1
                target_jeroo = getJerooList();
                generateAndRun(target_jeroo, y, x)                
                break;
            }
        }
    }   
}