function render_board(){
    canvas = document.getElementsByTagName('canvas')[0]
    ctx    = canvas.getContext('2d')
    jerooClass.render(ctx)
}
function getJerooList(){
    window.jerooClass.jeroos;
    //Get all of the elements that arent null
    var jerooList = jerooClass.jeroos.filter(function(jeroo){
        return jeroo != null;
    })
    return jerooList;
}

function getJerooById(id){
    var jerooList = getJerooList();
    for(var i = 0; i < jerooList.length; i++){
        if(jerooList[i].id == id){
            return jerooList[i];
        }
    }
    return null;
}

(() => {
    selectedJeroo = null;

    document.addEventListener('keydown', (event) => {
        //If document.getElementById('runContiniousButton').disabled == true stop the keyevent from scrolling the page
        if(document.getElementById('stopButton').disabled == false){
            const keyName = event.key;
            if(keyName == 'ArrowUp' || keyName == 'ArrowDown' || keyName == 'ArrowLeft' || keyName == 'ArrowRight' || keyName == '+'){
                event.preventDefault();
            }
            jeroo_list = getJerooList();

            //If keyName == '+' then select the next jeroo
            if(keyName == '+'){
                if(selectedJeroo == null){
                    selectedJeroo = 0;
                }else{
                    selectedJeroo = (selectedJeroo + 1) % jeroo_list.length;
                }
                console.log(selectedJeroo);
            }
            //else if arrow keys move the selected jeroo in that direction using teleport
            else if(keyName == 'ArrowUp'){
                if(selectedJeroo != null){
                    jeroo_list[selectedJeroo].teleport(jerooClass, jeroo_list[selectedJeroo].x, jeroo_list[selectedJeroo].y - 1);
                }
            }else if(keyName == 'ArrowDown'){
                if(selectedJeroo != null){
                    jeroo_list[selectedJeroo].teleport(jerooClass, jeroo_list[selectedJeroo].x, jeroo_list[selectedJeroo].y + 1);
                }
            }else if(keyName == 'ArrowLeft'){
                if(selectedJeroo != null){
                    jeroo_list[selectedJeroo].teleport(jerooClass, jeroo_list[selectedJeroo].x - 1, jeroo_list[selectedJeroo].y);
                }
            }else if(keyName == 'ArrowRight'){
                if(selectedJeroo != null){
                    jeroo_list[selectedJeroo].teleport(jerooClass, jeroo_list[selectedJeroo].x + 1, jeroo_list[selectedJeroo].y);
                }
            }
            render_board();
        }
    })
})()


console.log('movementcontroller.js')