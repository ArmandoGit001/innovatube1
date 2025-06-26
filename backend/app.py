import certifi
from flask import Flask, render_template, request, redirect, flash, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
from flask import session
from flask_cors import CORS 

app = Flask(__name__)
app.secret_key = 'clave_secreta_segura'
CORS(app)  # CORS desde angular

client = MongoClient("mongodb+srv://martingonzalezmichaca:QnhhorA54NNdffN4@cluster0.bcjkjfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['miapp']
usuarios = db['usuarios']

## -- REGISTER -- ##
@app.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    name = data.get('name')
    last_name = data.get('last_name')
    user_name = data.get('user_name')
    email = data.get('email')
    password = data.get('password')
    
    if usuarios.find_one({'user_name': user_name}):
        return jsonify({"message": "Este usuario ya está registrado."}), 400
    
    hash_pass = generate_password_hash(password)
    
    nuevo_usuario = {
        "_id": str(uuid.uuid4()),
        "name": name,
        "last_name": last_name,
        "user_name": user_name,
        "email": email,
        "password": hash_pass
    }
    
    usuarios.insert_one(nuevo_usuario)
    return jsonify({"message": "Registro exitoso."}), 201

## -- LOGIN -- ##
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Datos recibidos:", data)
    user_name = data.get('user_name')
    password = data.get('password')
    
    try:
        user = usuarios.find_one({'user_name': user_name})
    except Exception as e:
        print("Error al consultar Mongo:", e)
        return jsonify({"error": "Error de base de datos"}), 500
    
    if user and check_password_hash(user['password'], password):
        session['usuario'] = {
            "id": user['_id'],
            "nombre": user['name'],
            "apellido": user['last_name'],
            "user_name": user['user_name'],
            "email": user['email']
        }
        return jsonify({"message": "Inicio de sesión exitoso."}), 200
    else:
        return jsonify({"message": "Credenciales incorrectas."}), 401

@app.route('/logout')
def logout():
    session.pop('usuario', None)
    return jsonify({"message": "Sesión cerrada."}), 200

@app.route('/')
def home():
    if 'usuario' in session:
        nombre = session['usuario']['nombre']
        return f"<h1>Bienvenido, {nombre}!</h1><br><a href='/logout'>Cerrar sesión</a>"
    else:
        return redirect('/login')

#function principal para iniciar el servidor
if __name__ == '__main__':
    app.run(debug=True, port=8000)
