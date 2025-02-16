from flask import Blueprint

auth = Blueprint('blueprint', __name__)

@auth.route("/")
def home():
    return 'Hello, World!'

@auth.route("/register")
def register():
    return "Register"

@auth.route("/login")
def login():
    return "Login"

@auth.route("/logout")
def logout():
    return "Logout"
