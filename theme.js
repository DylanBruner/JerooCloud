console.log('theme.js');
document.title = 'Jeroo+'
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

try {
    jsonData = JSON.parse(localStorage['preferences'])
    jsonData['colorTheme'] = 'darcula'
    localStorage['preferences'] = JSON.stringify(jsonData)
}
catch(e){
    jsonData = {'colorTheme': 'darcula', 'fontSize': 12}
    localStorage['preferences'] = `"${JSON.stringify(jsonData)}"`
}

//Hide 'Current Language Style'
document.getElementsByClassName('mat-form-field-infix ng-tns-c73-8')[0].style.display = 'none'
//Hide Jeroo Image
document.getElementsByTagName('img')[1].style.display = 'none'
//Shift the output console up
document.getElementsByClassName('language-form-container')[0].style.display = 'none'
document.getElementsByClassName('messages-div')[0].style.marginTop = '5px'
//Hide clear button in console

document.getElementById('runButton').addEventListener('click', () => {
    setTimeout(() => {
        document.getElementsByClassName('messages-div')[0].getElementsByClassName('mat-card-actions')[0].style.display = 'none'
        document.getElementsByClassName('messages-div')[0].getElementsByClassName('mat-divider')[0].style.display = 'none'
        document.getElementsByClassName('error-window')[0].style.backgroundColor = '#131313'
        document.getElementsByClassName('mat-card mat-focus-indicator ng-star-inserted')[0] = '#131313'
    }, 100)
})
document.getElementById('runContiniousButton').addEventListener('click', () => {
    setTimeout(() => {
        document.getElementsByClassName('messages-div')[0].getElementsByClassName('mat-card-actions')[0].style.display = 'none'
        document.getElementsByClassName('messages-div')[0].getElementsByClassName('mat-divider')[0].style.display = 'none'
        document.getElementsByClassName('error-window')[0].style.backgroundColor = '#131313'
        document.getElementsByClassName('mat-card mat-focus-indicator ng-star-inserted')[0] = '#131313'
    }, 100)
})

//Rename code tabs
document.getElementsByClassName('mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted')[0].innerText = 'Main'
document.getElementsByClassName('mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted')[0].style.color = 'white'
document.getElementsByClassName('mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted')[1].innerText = 'Methods'
document.getElementsByClassName('mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted')[1].style.color = 'white'

//Make icons & text white
getElementByXpath('/html/body/app-root/app-dashboard/mat-sidenav-container/mat-sidenav-content/div/div[2]/app-jeroo-island/div/div[1]').style.color = 'white'
document.getElementsByClassName('toolbar')[0].style.color = 'white'
icons = document.getElementsByTagName('path')
for (i = 0; i < icons.length; i++) {
    icons[i].style.fill = 'white'
}

//Dark theme
document.getElementsByClassName('toolbar')[0].style.backgroundColor = '#323233' //Toolbar
document.getElementsByTagName('mat-sidenav-content')[0].style.backgroundColor = '#1e1e1e' //Background

if (localStorage['enableActiveLineHide'] == 'true' || localStorage['enableActiveLineHide'] == undefined) {
    style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = '.activeline-highlight {background: none}'
    document.getElementsByTagName('head')[0].appendChild(style)
} 


function tryApplyTheme(){
    //Handles the themeing for things that change and that arent loaded yet
    try {
        document.getElementsByClassName('CodeMirror cm-s-darcula')[0].style.borderWidth = '0px'
        elems = document.getElementsByClassName('mat-menu-content')
        for (i = 0; i < elems.length; i++) {
            elems[i].style.backgroundColor = '#303031'
            elems2 = document.getElementsByClassName('mat-focus-indicator mat-menu-item ng-star-inserted'); for (j = 0; j < elems2.length; j++) {elems2[j].style.color = 'white'}
            elems2 = document.getElementsByClassName('mat-radio-outer-circle'); for (j = 0; j < elems2.length; j++) {elems2[j].style.borderColor = 'white'}
            elems2 = document.getElementsByTagName('span'); for (j = 0; j < elems2.length; j++) {
                if (!elems2[j].className.includes('CodeMirror-line') && !elems2[j].className.includes('cm')) {
                    elems2[j].style.color ='white'
                }
            }
        }

        elems = document.getElementsByTagName('pre')
        for (i = 0; i < elems.length; i++) {if (elems[i].id.includes('name') && !elems[i].className.includes('CodeMirror-line')) {elems[i].style.color = 'white'}}
        elems = document.getElementsByTagName('div'); for (i = 0; i < elems.length; i++) {elems[i].style.color = 'white'}
    } catch(e){}
    setTimeout(tryApplyTheme, 1000)
}
document.addEventListener('click', tryApplyTheme)

tryApplyTheme()


//Modify the CSS rules asoociated with a class

setInterval(() => {
    elems = document.getElementsByClassName('cm-keyword')
    for (i = 0; i < elems.length; i++) {
        if (['while', 'if', 'else','else if'].includes(elems[i].innerText)) {
            elems[i].style.color = '#CE16A3'
        }
        else {
            elems[i].style.color = '#168BCE'
        }
    }
    elems = document.getElementsByClassName('cm-atom')
    for (i = 0; i < elems.length; i++) {
        if (['true', 'false'].includes(elems[i].innerText)) {
            elems[i].style.color = '#CE16A3'
        }
        else if (elems[i].innerText == 'new'){
            elems[i].style.color = '#168BCE'
        }
        else if (['NORTH', 'SOUTH', 'EAST', 'WEST'].includes(elems[i].innerText)) {
            elems[i].style.color = '#168BCE'
        }
        else {
            elems[i].style.color = '#CE16A3'
        }
    }
}, 100)

setInterval(() => {
    //Adaptive themeing service
    code    = localStorage['source']
    methods = []
    //Look through the code and find all the methods defined with the following syntax: method name() { ... }
    for (i = 0; i < code.length; i++) {
        if (code[i] == 'm' && code[i+1] == 'e' && code[i+2] == 't' && code[i+3] == 'h' && code[i+4] == 'o' && code[i+5] == 'd' && code[i+6] == ' ') {
            i += 7
            name = ''
            while (code[i] != '(') {
                name += code[i]
                i++
            }
            methods.push(name.replaceAll('_',''))
        }
    }

    elems = document.getElementsByClassName('cm-variable')
    for (i = 0; i < elems.length; i++) {
        if (methods.includes(elems[i].innerText.replaceAll('_',''))) {
            elems[i].style.color = '#ECDE18'
        }
        else if (elems[i].innerText == 'Jeroo'){elems[i].style.color = '#14BA72'}
        else if (['hop', 'turn', 'isFlower', 'isNet', 'isWater', 'isClear', 
                  'isFacing', 'hasFlower', 'give', 'toss', 'pick', 'isJeroo'].includes(elems[i].innerText)) {
            elems[i].style.color = '#ECDE18'
        }
        else {elems[i].style.color = '#36BDC1'}
    }
}, 200)

alertify.success('Theme applied')