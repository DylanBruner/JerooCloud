console.log("passwordprotect.js");

setTimeout(() => {
    if (localStorage.getItem("password") == null || localStorage.getItem("password") != "1915") {
        pwd = prompt('Enter password')
        if (pwd == '1915'){localStorage['password'] = '1915'}
        else {window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
    }
}, 200)