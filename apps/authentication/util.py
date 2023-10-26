import os
import hashlib
import binascii

def hash_pass(password):
    """Hash a password for storing."""
    salt = hashlib.sha256(os.urandom(60)).hexdigest()
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt.encode('ascii'), 100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return f'{salt}{pwdhash}'

def verify_pass(provided_password, stored_password):
    """Verify a stored password against one provided by user"""
    print("provided_password1:",provided_password)
    print("stored_password1:",stored_password)
    '''
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', provided_password.encode('utf-8'), salt.encode('ascii'), 100000)
    print("salt :",salt)
    print("provided_password:",provided_password)
    print("stored_password:",stored_password)
    print("pwdhash:", pwdhash)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    print("pwdhash2:", pwdhash)
    return pwdhash == stored_password
    '''
    # Comparación directa de las contraseñas sin hashing
    return provided_password == stored_password