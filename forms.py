from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, BooleanField
from wtforms.validators import DataRequired, Email, Length


class validarUsuario(FlaskForm):
    nombreUsuario = StringField('Nombre de usuario', validators=[ DataRequired(), Length(min=8, max=50)])

    name = StringField('Nombre', validators=[DataRequired(), Length(max=64)])
    password = PasswordField('Password', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Registrar')


class loginUsuario(FlaskForm):
    email = StringField('Correo electrónico:', validators=[DataRequired()])
    password = PasswordField('Clave', validators=[DataRequired()])
    remember_me = BooleanField('Guardar la sesión')
    submit = SubmitField('Login')
