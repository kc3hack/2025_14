from flask import jsonify, session
from werkzeug.security import check_password_hash
from models import User

def login(data):
    # jsonにuser_nameとpasswordが含まれているか確認
    if not data or "user_name" not in data or "password" not in data:
        return jsonify({"error": "Missing user_name or password"}), 400

    user_name = data["user_name"]
    password = data["password"]

    user = User.query.filter_by(user_name=user_name).first()
    # ユーザーが存在しないかパスワードが間違っている場合
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    session["user_name"] = user_name
    print(session["user_name"])
    return jsonify({"status": "success"}), 200
