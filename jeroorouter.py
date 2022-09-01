import requests, injector, base64, json, os
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

base_url = 'https://jeroo.org'

@app.route('/beta/JerooCompiler.js')
def jeroo_compiler():
    with open('decompile/compiler.js', 'rb') as f:
        return f.read()

@app.route('/jeroofeatures.js')
def jeroo_features():
    with open('jeroofeatures.js', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/javascript'}

@app.route('/jeroocloud.js')
def jeroo_cloud():
    with open('jeroocloud.js', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/javascript'}

@app.route('/passwordprotect.js')
def password_protect():
    with open('passwordprotect.js', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/javascript'}

@app.route('/easystar.js')
def easystar():
    with open('easystar.js', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/javascript'}

@app.route('/pathfinding.js')
def pathfinding():
    with open('pathfinding.js', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/javascript'}

@app.route('/theme.js')
def theme():
    with open('theme.js', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/javascript'}

@app.route('/movementcontroller.js')
def movement_controller():
    with open('movementcontroller.js', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/javascript'}

@app.route('/alertifytheme.css')
def alertify_theme():
    with open('bootstrap.min.css', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/css'}

@app.route('/update_file/<filename>/<code>/<board>')
def update_file(filename: str, code: str, board: str):
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
    filename = base64.b64decode(filename).decode('utf-8')

    with open(f"programs/{filename}", 'r') as f:
        return f.read()
    
@app.route('/list_files')
def list_files():
    return '\n'.join(os.listdir('programs'))

@app.errorhandler(404)
def page_not_found(e):
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