//Load alertifyjs
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/AlertifyJS/1.13.1/alertify.min.js';
document.head.appendChild(script);

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/AlertifyJS/1.13.1/css/alertify.css';
document.head.appendChild(link);
//Load /jeroocloud.js
setTimeout(() => {
    var script = document.createElement('script');
    script.src = '/theme.js';
    document.head.appendChild(script);

    setTimeout(() => {
        var script = document.createElement('script');
        script.src = '/jeroocloud.js';
        document.head.appendChild(script);
        var script = document.createElement('script');
        script.src = '/movementcontroller.js';
        document.head.appendChild(script);
        var script = document.createElement('script');
        script.src = '/pathfinding.js';
        document.head.appendChild(script);
    }, 2000)
}, 2000)

setTimeout(() => {
    if (localStorage['speedup'] == 'true'){
        var script = document.createElement('script');
        script.src = '/speedup.js';
        document.head.appendChild(script);
    
    }
}, 5000)

//If run speed is already defined dont run anything else

origSetTimeout = setTimeout;
setTimeout = function(func, time){
    //Allow for modifying the time
    if (time == 2){origSetTimeout(func, runSpeed)}
    else {origSetTimeout(func, time)}
}

runSpeed = 2;

//Give time for alertify to load
setTimeout(() => {
    if (!document.location.href.includes('beta/dashboard')){
        alertify.error('JF - Not on the Jeroo Code Editor!!', 5)
        return 0; //Stop the code from running!
    }

    //Code to observe the page and detect stuffs
    function isLineSelected(line_element){return line_element.children[0].classList.contains('activeline-highlight')}
    function getCodeLines(){return document.getElementsByClassName('CodeMirror-code')[0].children}
    function getLineText(element){
        lineData = element.getElementsByClassName('CodeMirror-line')[0].getElementsByTagName('span')[0].children
        lineText = '';

        for(var i = 0; i < lineData.length; i++){
            lineText += lineData[i].innerText
        }
        return lineText;
    }

    function copyTextToClipboard(text){
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }

    function getSelectedLine(){
        lines = getCodeLines();
        for(var i = 0; i < lines.length; i++){
            if(isLineSelected(lines[i])){
                return [i, getLineText(lines[i])]
            }
        }
    }

    lastActiveLine = null;
    setInterval(() => {
        try {
            if (enabled){
                [line, text] = getSelectedLine();
                if (line){
                    if(line != lastActiveLine){
                        lastActiveLine = line;
                        onLineCalled(line, text);
                    }
                }
            }
        } catch(e){}
    }, 10); //This is not a good way to do this, but it works for now.

    //=====================

    //Config
    if (localStorage['logActions'] == undefined){localStorage['logActions'] = 'true'}

    enabled = true;
    //====================

    //More Helpers
    function logAction(action){if (localStorage['logActions'] == 'true'){alertify.success(action)}}
    //====================

    //Setup menubar
    (function (){
        //If disableMenu is either undefined or false, then show the menu
        if (localStorage['disableMenu'] == undefined || localStorage['disableMenu'] == 'false'){
            let menu_bar  = document.getElementsByClassName('mat-toolbar-row')[0].children[1].children[1].children
            let menu_item = menu_bar[menu_bar.length - 1].cloneNode(true)

            menu_item.getElementsByClassName('mat-button-wrapper')[0].innerText = 'Jeroo Features'

            menu_bar[menu_bar.length - 1].parentNode.insertBefore(menu_item, menu_bar[menu_bar.length - 1].nextSibling)

            menu_item.addEventListener('click', () => {
                option = prompt('Enter a command (ex. help)')
                if (option == 'help'){alert(["help - (displays this menu)",
                                            "speed-modifier - (changes the speed of the code)",
                                            "toggle - (toggles Jeroo features)",
                                            "toggle-log - (toggle most logging)",
                                            "copy-helpers - (copy helper functions)",
                                            "disable-menu - (stop injecting the menubar button)",
                                            "copy-blank - (copy the method required to run jf commands at full speed)",
                                            "toggle-board - (toggle the board)",
                                            "toggle-speedup - (toggle speedup.js)",
                                            "github - (opens the github page)"].join('\n'))}
                else if (option == 'toggle'){enabled = !enabled; alertify.success('' ? 'Disabled Jeroo Features' : 'Enabled Jeroo Features')}
                else if (option == 'toggle-log'){localStorage['logActions'] = localStorage['logActions'] == 'true' ? 'false' : 'true'; alertify.success('Logging ' + (localStorage['logActions'] == 'true' ? 'Enabled' : 'Disabled'))}
                else if (option == 'copy-helpers'){
                    copyTextToClipboard(["method hopUntilObstacle(){while (isClear(AHEAD)){hop();}}",
                                         "method safeHop(){if (!isNet(AHEAD) && !isWater(AHEAD)){hop();}}",
                                         "method hopAndPlant(){hop(); plant();}",
                                         "method plantAndHop(){plant(); hop();}",
                                         "method blank(){turn(LEFT); turn(LEFT); turn(LEFT); turn(LEFT);}"].join('\n'))
                    alertify.success('Copied helper functions to clipboard')
                }
                else if (option == 'disable-menu'){localStorage['disableMenu'] = 'true'; alertify.success('Menu Disabled')}
                else if (option == 'copy-blank'){copyTextToClipboard("method blank(){turn(LEFT); turn(LEFT); turn(LEFT); turn(LEFT);}")}
                else if (option == 'github'){window.open('https://github.com/DylanBruner/JerooFeatures')}
                else if (option == 'toggle-speedup'){
                    if (localStorage['speedup'] == 'true'){
                        localStorage['speedup'] = 'false';
                        alertify.error('Speedup Disabled')
                    } else {
                        localStorage['speedup'] = 'true';
                        alertify.success('Speedup Enabled')
                    }
                }
                else if (option == 'speed-modifier'){
                    runSpeed = prompt('Enter a speed delay (ex. 0.5)ms')
                    alertify.success('Speed set to ' + runSpeed)
                }
                else if (option == 'toggle-board'){
                    if (document.getElementsByClassName('jeroo-island')[0].style.display == 'none'){
                        document.getElementsByClassName('jeroo-island')[0].style.display = 'block'
                        alertify.success('Board Enabled')
                    }
                    else {
                        document.getElementsByClassName('jeroo-island')[0].style.display = 'none'
                        alertify.success('Board Disabled')
                    }
                }
                else {alertify.error('Invalid command')}
            })
        }
    })()
    //====================

    function getJerooList(){
        window.jerooClass.jeroos;
        //Get all of the elements that arent null
        var jerooList = jerooClass.jeroos.filter(function(jeroo){
            return jeroo != null;
        })
        return jerooList;
    }

    var pathfindToNearestFlower=o=>{for(var e=0;e<jerooClass.cols;e++)for(var r=0;r<jerooClass.rows;r++)if(tile=jerooClass.getTile(e,r),"F"==tile)return console.log("found flower at",r,e),target_jeroo=getJerooList()[o],void generateRoute(target_jeroo.x,target_jeroo.y,e,r,o=>{console.log("Route generated!"),runRoute(target_jeroo,o)})};
    
    function teleportJeroo(jeroo, x, y){
        jeroo.x = x; jeroo.y = y;

    }

    //Custom Stuff
    function onLineCalled(line_number, line_text){
        //Play the boom sound effect
        if(line_text.endsWith('playBoomSound()')){new Audio('https://www.myinstants.com/media/sounds/vine-boom.mp3').play(); logAction('Boom!')}
        //Execute javascript from jeroo
        else if(line_text.includes('//RJS: ')){mixin = line_text.split('//')[1].trim(); if(mixin.includes('RJS:')){eval(mixin.replace('RJS:', ''))}; logAction('Executed RJS: ' + mixin)}
        //Play sound from URL
        else if(line_text.includes('playSound(')){new Audio(line_text.split('playSound(')[1].split(')')[0]).play(); logAction('Playing sound')}
        //Log text to screen
        else if(line_text.includes('log(')){alertify.success(line_text.split('log(')[1].split(')')[0])}
        //Text To Speach
        else if(line_text.includes('tts(')){
            msg = new SpeechSynthesisUtterance();
            msg.text = line_text.split('tts(')[1].split(')')[0]
            window.speechSynthesis.speak(msg);
            logAction(`Speaking ${msg.text}`)
        }
        else if (line_text.includes('teleport(')){
            args = line_text.split('teleport(')[1].split(')')[0].split(',')
            x1 = Number(args[0]) + 1; y1 = Number(args[1]) + 1
            x2 = Number(args[2]); y2 = Number(args[3])
            trgt = jerooClass.getJeroo(x1,y1)
            if (!trgt){
                alertify.error(`Jeroo not found at ${x1-1}, ${y1-1}`) 
                return;
            }
            trgt.teleport(jerooClass,y2,x2)
        }
        else if (line_text.includes('teleportById(')){
            args = line_text.split('teleportById(')[1].split(')')[0].split(',')
            jeroo_list = getJerooList()
            for (i = 0; i < jeroo_list.length; i++){
                if (jeroo_list[i].id == args[0]){
                    jeroo_list[i].teleport(jerooClass, Number(args[2]), Number(args[1]))
                    return;
                }
            }
        }
        else if (line_text.includes('ghost(')){
            args = line_text.split('ghost(')[1].split(')')[0].split(',')
            window.disableJerooCollisions = args[0] == 'true'
        }
        else if (line_text.includes('pathfindTo(')){
            args = line_text.split('pathfindTo(')[1].split(')')[0].split(',')
            logAction('Pathfinding...')
            generateAndRun(getJerooById(Number(args[0])), Number(args[1]), Number(args[2]))
        }

        else if (line_text.includes('pathfindToFlower(')){
            jeroo_id = Number(line_text.split('pathfindToFlower(')[1].split(')')[0])
            try {
                pathfindToNearestFlower(jeroo_id)
                logAction('Pathfinding...')
            } catch (e){
                alertify.error(e)
            }
        }
    }
    //====================

    alertify.notify('Jeroo features loaded!', 'success', 5)
    //Create a banner across the top of the screen
    var banner = document.createElement('div')
    banner.style.position = 'absolute'
    banner.style.top = '0px'
    banner.style.left = '0px'
    banner.style.width = '100%'
    banner.style.height = '20px'
    banner.style.backgroundColor = 'tomato'
    banner.style.color = 'white'
    banner.style.textAlign = 'center'
    banner.style.fontSize = '16px'
    //Display the banner on top of all other elements

    document.getElementsByTagName('mat-toolbar-row')[0].appendChild(banner)
    document.getElementsByTagName('mat-toolbar-row')[0].style.marginTop = '20px'

    var bannerText = document.createElement('span')
    bannerText.id  = 'bannerText'
    bannerText.innerHTML = 'Warning using patched Compiler and UI, may be unstable!'
    bannerText.style.display = 'flex'
    bannerText.style.justifyContent = 'center'
    bannerText.style.alignItems = 'center'
    bannerText.style.height = '100%'
    bannerText.style.userSelect = 'none'

    banner.appendChild(bannerText)

},1000)