from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configurar la conexión a la base de datos de psicólogos
psychologist_db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="register"
)

# Endpoint para el registro de psicólogos
@app.route('/psicologo_', methods=['POST'])
def psicologo_():
    data = request.form
    cursor = psychologist_db.cursor()
    sql = "INSERT INTO registropsicologos (usuario, contraseña, correo, fecha_nacimiento, identificacion) VALUES (%s, %s, %s, %s, %s)"
    val = (data['usuario'], data['contraseña'], data['correo'], data['fecha_nacimiento'], data['documento'])
    cursor.execute(sql, val)
    psychologist_db.commit()
    cursor.close()
    return jsonify({'message': 'Psicólogo registrado exitosamente'})

if __name__ == '__main__':
    app.run(debug=True)
