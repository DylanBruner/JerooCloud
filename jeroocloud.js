function getCode(){return localStorage.getItem("source")}
function setCode(code){localStorage.setItem("source",code)}
function getBoard(){return localStorage.getItem("board")}
function setBoard(board){localStorage.setItem("board",board)}


//Setup the menubar
let menu_bar  = document.getElementsByClassName('mat-toolbar-row')[0].children[1].children[1].children
let menu_item = menu_bar[menu_bar.length - 1].cloneNode(true)

menu_item.getElementsByClassName('mat-button-wrapper')[0].innerText = 'Jeroo Cloud'

menu_bar[menu_bar.length - 1].parentNode.insertBefore(menu_item, menu_bar[menu_bar.length - 1].nextSibling)
menu_item.addEventListener('click', () => {
    option = prompt('Enter a command (ex. help)')

    if (option == 'help') {
        alert([
            'help - displays this message',
            'list - lists all files in the cloud',
            'save - saves the current code to the cloud',
            'load - loads the code from the cloud',
        ].join('\n'))
    }
    else if (option == 'list'){
        fetch('/list_files').then(response => response.text()).then(data => {
            alert(data)
        })
    }

    else if (option == 'save'){
        target_file = prompt('Enter save name')
        fetch('/update_file/' + btoa(target_file) + '/' + btoa(getCode()) + '/' + btoa(getBoard()))
<<<<<<< HEAD
        alertify.success('Saved!')
=======
        alertify.success('Enviorment Saved')
>>>>>>> ad1e00ad99feb9ab7a94f8d2bda7e02373956065
    }
    else if (option == 'load'){
        target_file = prompt('Enter file name')
        load_mode   = prompt('Enter load mode (code/board/both)')
        //If both arent blank
        if (target_file == '' || load_mode == ''){
            alertify.error('One or more fields are blank')
            return;
        }
        fetch('/get_file/' + btoa(target_file)).then(response => response.json()).then(data => {
            if (load_mode == 'both'){
                try {
                    setCode(data.code)
                    setBoard(data.board)
                    alertify.success('Code and board loaded')
                    window.location.reload()
                } catch(e){
                    alertify.error('Error loading code and board')
                }
            }
            else if (load_mode == 'code'){
                try {
                    setCode(data.code)
                    alertify.success('Code loaded')
                    window.location.reload()
                } catch (e){
                    alertify.error('Error loading code')
                }
            }
            else if (load_mode == 'board'){
                try {
                    setBoard(data.board)
                    alertify.success('Board loaded')
                    window.location.reload()
                } catch (e){
                    alertify.error('Error loading board')
                }
            }
        })
    }
    else {alertify.error('Invalid command')   }
})

alertify.success('Jeroo Cloud loaded')
