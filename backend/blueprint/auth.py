from flask import Blueprint, redirect, url_for

auth = Blueprint('blueprint', __name__)

@auth.route("/")
def home():
    return redirect(url_for("blueprint.register"))

@auth.route("/register")
def register():
    return "Register"

@auth.route("/login")
def login():
    return "Login"

@auth.route("/logout")
def logout():
    return "Logout"
