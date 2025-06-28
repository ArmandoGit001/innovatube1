from dotenv import load_dotenv
import os
import certifi
from flask import Flask, render_template, request, redirect, flash, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
from flask import session
from flask_cors import CORS 
import requests

load_dotenv()  # Esto carga las variables de .env al entorno

app = Flask(__name__)
#app.secret_key = 'clave_secreta_segura'
CORS(app)  # CORS desde angular
#YOUTUBE_API_KEY = 'AIzaSyDeHBLyeR0GmRrWBEZ76Eq5zMyYQU3ZRhs'

#actualizado para railway
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "default_key")
YOUTUBE_API_KEY = os.environ.get("YOUTUBE_API_KEY")

mongo_uri = os.environ.get("MONGO_URI")
client = MongoClient(mongo_uri, tls=True, tlsCAFile=certifi.where())

#client = MongoClient("mongodb+srv://martingonzalezmichaca:QnhhorA54NNdffN4@cluster0.bcjkjfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

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

## -- Consumo de la API de youtube -- ##
@app.route('/api/search')
def youtube_search():
    query = request.args.get('q', '')
    url = f'https://www.googleapis.com/youtube/v3/search'
    params = {
        'part': 'snippet',
        'q': query,
        'type': 'video',
        'maxResults': 10,
        'key': YOUTUBE_API_KEY
    }
    response = requests.get(url, params=params)
    return jsonify(response.json())

@app.route('/')
def home():
    if 'usuario' in session:
        nombre = session['usuario']['nombre']
        return f"<h1>Bienvenido, {nombre}!</h1><br><a href='/logout'>Cerrar sesión</a>"
    else:
        return redirect('/login')
    
@app.route('/login', methods=['GET'])
def login_get():
    return jsonify({"message": "Aquí debería ir tu frontend Angular para login"})

#function principal para iniciar el servidor
#if __name__ == '__main__':
#    app.run(debug=True, port=8000)

#añadido para railway:
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(debug=False, port=port, host="0.0.0.0")
