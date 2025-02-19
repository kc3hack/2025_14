from flask import Blueprint, redirect, url_for, request, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from db_instance import db
from datetime import datetime

auth = Blueprint("blueprint", __name__)

@auth.route("/")
def home():
    return redirect(url_for("blueprint.register"))

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data or "user_name" not in data or "password" not in data:
        return jsonify({"error": "Missing user_name or password"}), 400

    user_name = data["user_name"]
    password = data["password"]
    date = datetime.now()

    # 重複ユーザーのチェック
    if User.is_duplicate_user(user_name):
        return jsonify({"error": "User already exists"}), 400

    # パスワードのハッシュ化
    hashed_password = generate_password_hash(password)

    user = User(user_name=user_name, password=hashed_password, datetime=date)
    db.session.add(user)
    db.session.commit()

    return jsonify({"status": "success"}), 201

@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or "user_name" not in data or "password" not in data:
        return jsonify({"error": "Missing user_name or password"}), 400

    user_name = data["user_name"]
    password = data["password"]

    user = User.query.filter_by(user_name=user_name).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    session["user_name"] = user_name
    return jsonify({"status": "success"}), 200

@auth.route("/logout", methods=["POST"])
def logout():
    session.pop("user_name", None)
    return jsonify({"status": "success"}), 200
