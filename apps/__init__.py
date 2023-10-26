# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

import os

from flask import Flask, abort
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from importlib import import_module

# Crea una instancia de SQLAlchemy para interactuar con la base de datos
db = SQLAlchemy()

# Crea una instancia de LoginManager para manejar la autenticación del usuario
login_manager = LoginManager()

# Función para registrar extensiones en la aplicación Flask
def register_extensions(app):
    db.init_app(app)  # Inicializa la extensión SQLAlchemy con la aplicación
    login_manager.init_app(app)  # Inicializa la extensión LoginManager con la aplicación

# Función para registrar los blueprints (módulos) de la aplicación
def register_blueprints(app):
    for module_name in ('authentication', 'home'):
        module = import_module('apps.{}.routes'.format(module_name))
        app.register_blueprint(module.blueprint)  # Registra los blueprints en la aplicación

# Función para configurar la base de datos
def configure_database(app):

    # Se ejecuta antes de la primera solicitud a la aplicación
    @app.before_first_request
    def initialize_database():
        try:
            db.create_all()  # Intenta crear las tablas en la base de datos
        except Exception as e:
            print('> Error: Failed to create tables in MySQL database: ' + str(e))
            abort(500)  # Retorna un error HTTP 500 si no se puede conectar a MySQL

    # Se ejecuta después de cada solicitud a la aplicación para cerrar la conexión de la base de datos
    @app.teardown_request
    def shutdown_session(exception=None):
        db.session.remove()  # Cierra la sesión de la base de datos

# Función principal para crear la aplicación Flask
def create_app(config):
    app = Flask(__name__)  # Crea una instancia de la aplicación Flask
    app.config.from_object(config)  # Carga la configuración desde un objeto de configuración
    register_extensions(app)  # Registra las extensiones en la aplicación
    register_blueprints(app)  # Registra los blueprints en la aplicación
    configure_database(app)  # Configura la base de datos
    return app  # Retorna la aplicación configurada
