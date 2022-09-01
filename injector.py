javscript_script_injector = '''
var script = document.createElement('script');
script.src = '[URL]';
document.head.appendChild(script);
'''

def inject_javascript(orig_js: bytes):
    orig_js = orig_js.decode('utf-8')
    orig_js += '\n' + javscript_script_injector.replace('[URL]', '/jeroofeatures.js')
    orig_js += '\n' + javscript_script_injector.replace('[URL]', '/passwordprotect.js')
    return orig_js