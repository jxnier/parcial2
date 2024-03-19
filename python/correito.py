from flask import Flask, request, jsonify
import smtplib
from flask_cors import CORS
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app, resources={r"/enviarpqrs": {"origins": "http://127.0.0.1:5500"}})

@app.route('/enviarpqrs', methods=['POST'])
def enviarpqrs():
    # Obtener los datos del formulario
    tipo = request.form['tipo']
    nombre = request.form['nombre']
    correo = request.form['correo']
    mensaje = request.form['mensaje']

    # Crear el mensaje de correo electrónico
    msg = MIMEMultipart()
    msg['From'] = correo
    msg['To'] = 'infoaplicativoiub@gmail.com'
    msg['Subject'] = f'Nuevo PQRS - {tipo}'

    # Cuerpo del mensaje
    body = f'Tipo: {tipo}\nNombre: {nombre}\nCorreo electrónico: {correo}\nMensaje: {mensaje}'
    msg.attach(MIMEText(body, 'plain'))

    # Conexión al servidor SMTP de Gmail
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    # Ingresar credenciales de correo electrónico
    server.login("infoaplicativoiub@gmail.com", "123456Lourdes")
    # Enviar correo electrónico
    server.send_message(msg)
    server.quit()

    return jsonify({'message': 'PQRS enviado exitosamente'})

if __name__ == '__main__':
    app.run(debug=True)
