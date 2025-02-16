from flask import Blueprint

auth = Blueprint('auth', __name__)

@auth.route("/")
def home():
    return 'Hello, World!'

@auth.route("/login")
def login():
    return "Login"
