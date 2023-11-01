# config.py

import os
import random
import string
import configparser

config = configparser.ConfigParser()
# pip install mysql-connector-python
try:
    config.read('D://mysql_config.ini')
    #config.read()
    DB_HOST = config.get('mysql', 'host')
    DB_PORT = config.get('mysql', 'port')
    DB_USERNAME = config.get('mysql', 'user')
    DB_PASS = config.get('mysql', 'pass')
    DB_NAME = config.get('mysql', 'database')
    print("Successfully read the configuration file")
except Exception as e:
    print(f'Error: {e}')
    raise

class Config(object):
    basedir = os.path.abspath(os.path.dirname(__file__))

    # Assets Management
    ASSETS_ROOT = os.getenv('ASSETS_ROOT', '/static/assets')
    
    SECRET_KEY  = os.getenv('SECRET_KEY', None)
    if not SECRET_KEY:
        SECRET_KEY = ''.join(random.choice(string.ascii_lowercase) for i in range(32))

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    if DB_NAME and DB_USERNAME:
        SQLALCHEMY_DATABASE_URI = f"mysql+mysqlconnector://{DB_USERNAME}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    else:
        raise ValueError("Missing database configuration")
config_dict = {
    'Production': Config,
    'Debug': Config  # Usar el mismo objeto de configuración para el modo de depuración
}
