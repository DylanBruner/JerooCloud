console.log("passwordprotect.js");

if (localStorage['loggedIn'] == undefined){localStorage['loggedIn'] = 'false'}
localStorage['loggedIn'] = 'false'

if (localStorage['loggedIn'] == 'false'){
    if (prompt("Password?") !== "1915"){console.log("wrong password"); window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
    else {localStorage['loggedIn'] = 'true'; console.log("correct password");}
}
else {console.log("already logged in");}