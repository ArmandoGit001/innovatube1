from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "API funcionando"

@app.route('/login', methods=['GET'])
def login_get():
    return jsonify({"message": "Aquí debería ir tu frontend Angular para login"})

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
