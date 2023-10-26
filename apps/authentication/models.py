from flask_login import UserMixin
from apps import db, login_manager
# from apps.authentication.util import hash_pass

class Usuario(db.Model,UserMixin):
    __tablename__ = 'usuario'
    id = db.Column(db.String(20), primary_key=True)  # Columna para el ID del usuario (clave primaria y única).
    usuario_rol = db.Column(db.Enum('Administrador', 'Recursos Humanos', 'Trabajador', 'Sin acceso', name='roles'), default='Sin acceso')  # Columna para el rol del usuario.
    usuario_nombres = db.Column(db.String(100), nullable=False)  # Columna para los nombres del usuario.
    usuario_apellidos = db.Column(db.String(100), nullable=False)  # Columna para los apellidos del usuario.
    usuario_correo = db.Column(db.String(100), unique=True, nullable=False)  # Columna para el correo electrónico del usuario (único).
    usuario_contrasenia = db.Column(db.String(50), nullable=False)  # Columna para la contraseña del usuario.
    usuario_sexo = db.Column(db.Enum('Masculino', 'Femenino', 'No Especificado', name='sexos'), default='No Especificado')  # Columna para el sexo del usuario.
    usuario_telefono = db.Column(db.String(50), nullable=False)  # Columna para el número de teléfono del usuario.

    def __init__(self, **kwargs):
        for property, value in kwargs.items():
            if hasattr(value, '__iter__') and not isinstance(value, str):
                # Si el valor es una lista o similar, toma el primer elemento de la lista.
                value = value[0]
            # Si la propiedad es 'usuario_contrasenia', cifra la contraseña antes de asignarla a la instancia.
            #if property == 'usuario_contrasenia':
            #    value = hash_pass(value)
            
            # Asigna el valor a la propiedad correspondiente del usuario.
            setattr(self, property, value)
    def __repr__(self):
        return str(self.usuario_nombres, self.usuario_apellidos)

@login_manager.user_loader
def user_loader(id):
    return Usuario.query.filter_by(id=id).first()  # Devuelve el usuario con el ID proporcionado.

# Define una función request_loader que Flask-Login utiliza para cargar un usuario basado en la solicitud.
@login_manager.request_loader
def request_loader(request):
    usuario_nombres = request.form.get('usuario_nombres')  # Obtiene el nombre de usuario de la solicitud.
    usuario_apellidos = request.form.get('usuario_apellidos')
    user = Usuario.query.filter_by(usuario_nombres = usuario_nombres, usuario_apellidos = usuario_apellidos).first()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    return user if user else None  # Devuelve el usuario si se encuentra, o None si no se encuentra.
