import requests, injector, base64, json, os
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

base_url = 'https://jeroo.org'
DISABLE_CLOUD   = False
NEARLY_VANILLA  = False #Disable the loading of all ExposedJavascriptFiles, this remove nearly all the customizations but will leave a few and therefor run faster than 
                        #a vanilla jeroo.org

#List of all javascript files that can be requested
ExposedJavascriptFiles = ['jeroofeatures.js', 'jeroocloud.js', 'passwordprotect.js', 
                          'easystar.js', 'theme.js', 'pathfinding.js', 'movementcontroller.js', 
                          'speedup.js']

@app.route('/beta/JerooCompiler.js')
def jeroo_compiler():
    with open('decompile/compiler.js', 'rb') as f:
        return f.read()

@app.route('/alertifytheme.css')
def alertify_theme():
    with open('bootstrap.min.css', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/css'}

@app.route('/update_file/<filename>/<code>/<board>')
def update_file(filename: str, code: str, board: str):
    if DISABLE_CLOUD: return 'Cloud disabled', 200
    try:
        filename = base64.b64decode(filename).decode('utf-8')
        code     = base64.b64decode(code).decode('utf-8')
        board    = base64.b64decode(board).decode('utf-8')

        with open(f"programs/{filename}", 'w') as f:
            f.write(json.dumps({
                'code': code,
                'board': board
            }))
        return 'OK', 200
    except Exception as e:
        return 'ERROR', 500

@app.route('/get_file/<filename>')
def get_file(filename: str):
    if DISABLE_CLOUD: return 'Cloud disabled', 200
    filename = base64.b64decode(filename).decode('utf-8')

    with open(f"programs/{filename}", 'r') as f:
        return f.read()
    
@app.route('/list_files')
def list_files():
    if DISABLE_CLOUD: return 'Cloud disabled', 200
    return '\n'.join(os.listdir('programs'))


@app.errorhandler(404)
def page_not_found(e):
    if request.path[1:] in ExposedJavascriptFiles:
        if NEARLY_VANILLA: return 'console.log(\'[Warning] Nearly Vanilla Enabled!\')', 200, {'Content-Type': 'text/javascript'}
        with open(f"{request.path[1:]}", 'r') as f:
            return f.read(), 200, {'Content-Type': 'text/javascript'}

    #Dont really want to forward all requests to jeroo.org
    if all(path not in request.url for path in ['favicon.ico', '/images', '/beta']) and request.path.strip() != '/' and request.path.strip() != '':
        return '404', 404
    data = requests.get(base_url + request.path).content
    if '.js' in request.path:
        if 'main' in request.path:
            with open('decompile/main.js', 'rb') as f:
                data = f.read()
            data = injector.inject_javascript(data)
        return data, 200, {'Content-Type': 'application/javascript'}
    elif '.css' in request.path:
        return data, 200, {'Content-Type': 'text/css'}

    return data, 200, {'Content-Type': 'text/html'}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)