from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

# initializations
app = Flask(__name__)
CORS(app)

# Mysql Connection
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'register'
mysql = MySQL(app)

# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"

@app.route('/add_registro', methods=['POST'])
def add_registro():
    try:
        if request.method == 'POST':
            nombre = request.form['nombre']
            correo = request.form['correo']
            contraseña = request.form['contraseña']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO registro (nombre, correo, contraseña, rol) VALUES (%s, %s, %s, 'estudiante')", (nombre, correo, contraseña))
            mysql.connection.commit()
            cur.close()
            return jsonify({"informacion":"Registro exitoso"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": "Error al registrar el usuario: " + str(e)})

if __name__ == '__main__':
    app.run(debug=True)
