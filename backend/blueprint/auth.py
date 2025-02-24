from flask import Blueprint, redirect, url_for, request, jsonify, session, make_response
from flask_cors import CORS
from authentication import auth_reset_password, auth_delete_account
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from db_instance import db
from datetime import datetime
auth = Blueprint("blueprint", __name__)

CORS(auth, supports_credentials=True, origins="https://frontend-latest-qscn.onrender.com")

@auth.route("/")
def home():
    return redirect(url_for("blueprint.register"))

@auth.route("/register", methods=["POST", "OPTIONS"])
def register():
    if request.method == "OPTIONS":
        return '', 204  # プリフライトリクエスト対応
    data = request.get_json()
    if not data or "user_name" not in data or "password" not in data:
        response = make_response(jsonify({"error": "Missing user_name or password"}), 400)
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Origin"] = "https://frontend-latest-qscn.onrender.com"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization/json"
        return response

    user_name = data["user_name"]
    password = data["password"]
    date = datetime.now()

    # 重複ユーザーのチェック
    if User.query.filter_by(user_name=user_name).first():
        response = make_response(jsonify({"error": "User already exists"}), 400)
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Origin"] = "https://frontend-latest-qscn.onrender.com"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization/json"
        return response

    hashed_password = generate_password_hash(password)

    user = User(user_name=user_name, password_hash=hashed_password, datetime=date)
    db.session.add(user)
    db.session.commit()
    response = make_response(jsonify({"status": "success"}), 201)
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Origin"] = "https://frontend-latest-qscn.onrender.com"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization/json"
    return response

@auth.route("/login", methods=["POST", "OPTIONS"])
def login():
    print(session.get("user_name"))
    data = request.get_json()
    if not data or "user_name" not in data or "password" not in data:
        return make_response(jsonify({"error": "Missing user_name or password"}), 400)

    user_name = data["user_name"]
    password = data["password"]

    user = User.query.filter_by(user_name=user_name).first()
    if not user or not check_password_hash(user.password_hash, password):
        return make_response(jsonify({"error": "Invalid credentials"}), 401)

    return make_response(jsonify({"status": "success", "user_id" : user.user_id}), 200)

@auth.route("/logout", methods=["POST", "OPTIONS"])
def logout():
    return jsonify({"status": "success"}), 200

@auth.route("/reset_password", methods=["POST", "OPTIONS"])
def reset_password():
    # パスワードをリセットする
    # リセットに成功した場合は json({status: "success"}), 200 を返す
    # リセットに失敗した場合は json({error: "error message"}), 400 を返す
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}, 400)
    return auth_reset_password.reset_password(request.get_json())

@auth.route("/delete_account", methods=["POST"])
def delete_account():
    # アカウントを削除する
    # 削除に成功した場合は json({status: "success"}), 200 を返す
    # 削除に失敗した場合は json({error: "error message"}), 400 を返す
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}, 400)
    return auth_delete_account.delete_account(request.get_json())

@auth.route("/check-session", methods=["GET", "OPTIONS"])
def check_session():
    return jsonify({"c:user_name": session["user_name"]}), 200
