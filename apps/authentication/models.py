from flask_login import UserMixin
from apps import db, login_manager
# from apps.authentication.util import hash_pass

class Usuario(db.Model, UserMixin):
    __tablename__ = 'api_usuario'  # Nombre de la tabla en la base de datos
    id = db.Column(db.String(20), primary_key=True, unique=True, nullable=False)
    id_usuario_rol_id = db.Column(db.Integer, db.ForeignKey('dropdownroles.id'), nullable=False)
    usuario_nombres = db.Column(db.String(100), nullable=False)
    usuario_apellidos = db.Column(db.String(100), nullable=False)
    usuario_correo = db.Column(db.String(100), unique=True, nullable=False)
    usuario_contrasenia = db.Column(db.String(100), nullable=False)
    usuario_sexo = db.Column(db.Enum('Masculino', 'Femenino', 'No Especificado', name='sexos'), default='No Especificado')
    usuario_telefono = db.Column(db.String(50), nullable=False)

    def __init__(self, **kwargs):
        for property, value in kwargs.items():
            if hasattr(value, '__iter__') and not isinstance(value, str):
                value = value[0]
            setattr(self, property, value)

    def __repr__(self):
        return f"{self.usuario_nombres} {self.usuario_apellidos}"

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
