# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

import os
from flask_migrate import Migrate
from flask_cors import CORS  # Agrega esta línea
from apps.config import config_dict
from apps import create_app, db

# Configuración para el modo debug, puerto y host
DEBUG = True
PORT = 4000
HOST = '0.0.0.0'

try:
    # Cargar la configuración usando los valores predeterminados
    app_config = config_dict['Debug']

except KeyError:
    exit('Error: Invalid <config_mode>. Expected values [Debug, Production]')

app = create_app(app_config)
Migrate(app, db)

# Agrega estas líneas para habilitar CORS
CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == "__main__":
    # Ejecutar la aplicación con la configuración especificada
    app.run(debug=DEBUG, port=PORT, host=HOST)
