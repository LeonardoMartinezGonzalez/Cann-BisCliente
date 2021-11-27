from flask import Flask, render_template, request, url_for, redirect, flash, session
import requests
from flask_login import LoginManager, current_user
from werkzeug.urls import url_parse

from forms import loginUsuario

app = Flask(__name__)
app.config['SECRET_KEY'] = 'PalabraUltraSecreta'
# login_manager = LoginManager(app)

host= 'http://192.168.1.74:5000'

@app.route('/miVariedad', methods=['GET'])
@app.route('/', methods=['GET'])
def index():
    misesion = request.args.get("salida")
    if misesion is not None:
        session.clear()

    variedad = request.args.get("miVariedad")
    if variedad is None:
        url_productos = f"{host}/productos"
    else:
        url_productos = f"{host}/productos/" + str(variedad)

    url_variedades=f"{host}/variedades"
    variedades = requests.get(url_variedades ) # headers={'x-access-tokens':''}
    productos = requests.get(url_productos)
    # for c in productos.json():
    #     print(c)
    print(variedad)
    return render_template('index.html', variedades = variedades.json(), productos = productos.json()) #,

@app.route('/login')
def login():
    return render_template('login.html') # "Aqui va la pagina de login"

@app.route('/usuario/validar', methods=['POST'])
def validarUsuario():
    url = f"{host}/login"
    correo = request.form['correo']
    clave = request.form['clave']
    dictUsuario = {
        "correo": correo,
        "clave": clave
    }
    respuesta = requests.get(url, json=dictUsuario) #.json()
    print(respuesta.json()['mensaje'])
    if respuesta.json()['estatus'] == 'ok-1': #******************************
        nombre = respuesta.json()['datosUsuario'][0]['nombreUsuario']  #******************************
        token = respuesta.json()['token']  #******************************
        session['token'] = token
        session['nombre'] = nombre
        print("Variables de sesion: ", session['token'], session['nombre'])
        url_variedades=f"{host}/variedades"
        variedades = requests.get(url_variedades)
        url_productos = f"{host}/productos"
        productos = requests.get(url_productos)
        return render_template('index.html', variedades = variedades.json(), productos = productos.json()) #, usuario = nombre, token=token
        # Si es valido el usuario, guardar el token en
    else:
        flash(respuesta.json()['mensaje'])
        return render_template('login.html')
    #return  " Validando usuario . . .  " # render_template('registro.html')


@app.route('/usuario')
def formularioUsuario():
    return  render_template('registro.html')




@app.route('/usuario/registro', methods=['GET', 'POST'])
def registroUsuario():
    url = f"{host}/usuario/registrar"
    nombre = request.form['nombre']
    correo = request.form['correo']
    clave = request.form['clave']
    telefonoCelular = request.form['telefonoCelular']
    dictUsuario = {
        "nombre": nombre,
        "correo": correo,
        "clave": clave,
        "telefonoCelular": telefonoCelular
    }
    respuesta = requests.post(url, json=dictUsuario)
    print(respuesta.json()['mensaje'])
    return  redirect(url_for('index'))

@app.route("/acercade")
def acercade():
    return render_template("acercade.html")

@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/contacto")
def contacto():
    return render_template("contacto.html")

@app.route("/productos")
def productos():
    variedad = request.args.get("miVariedad")
    if variedad is None:
        url_productos = f"{host}/productos"
    else:
        url_productos = f"{host}/productos/" + str(variedad)

    url_variedades=f"{host}/variedades"
    variedades = requests.get(url_variedades)
    productos = requests.get(url_productos)
    # for c in productos.json():
    #     print(c)
    print(variedad)
    return render_template("productos.html", variedades = variedades.json(), productos = productos.json())

@app.route("/carrito")
def carrito():
    return render_template("carrito.html")

@app.route("/checkout")
def checkout():
    if 'nombre' in session:
        print("Existe la sesion NOMBRE")
        url = f"{host}/validarusuario"
        print(session['nombre'])
        dictToken = {"token": session['token'] }
        respuesta = requests.post(url, json=dictToken)
        print(respuesta.json()['mensaje'])
        if respuesta.json()['estatus'] == "ok-1":
            # El cliente es valido y el token tambien
            # Regresar datos del cliente
            urlUsr = f"{host}/consultarusuario"
            # idUser = respuesta.json()['idUsuario']
            dictUsuario = {"idUsuario":  respuesta.json()['idUsuario'] }  # respuesta['datosUsuario'][0]['nombreUsuario']
            print(dictUsuario)
            respuestaUsr = requests.post(urlUsr, json=dictUsuario)
            print(respuestaUsr.json()['estatus'])
            if respuestaUsr.json()['estatus'] == "ok-1":
                print("Entro a datos de usuario")
                return  render_template("checkout.html", datosUsuario = respuestaUsr.json()['datosUsuario'])
            else:
                flash(respuestaUsr.json()['mensaje'])
                return render_template("carrito.html")
        else:
            flash(respuesta.json()['mensaje'])
            return render_template("carrito.html")
        #return render_template("checkout.html")
    else:
        print("No existe la ssion NOMBRE")
        flash('Debes ingresar como cliente')
        return render_template("carrito.html")

@app.route("/detalleproducto")
def detalleproducto():
    return render_template("detalleproducto.html")



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=8000)
