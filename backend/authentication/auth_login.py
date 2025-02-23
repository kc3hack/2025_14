from flask import jsonify, session, make_response
from werkzeug.security import check_password_hash
from models import User

def login(data):
    # jsonにuser_nameとpasswordが含まれているか確認
    if not data or "user_name" not in data or "password" not in data:
        return make_response(jsonify({"error": "Missing user_name or password"}), 400)

    user_name = data["user_name"]
    password = data["password"]

    user = User.query.filter_by(user_name=user_name).first()
    # ユーザーが存在しないかパスワードが間違っている場合
    if not user or not check_password_hash(user.password_hash, password):
        return make_response(jsonify({"error": "Invalid credentials"}), 401)

    if "user_name" in session:
        return make_response(jsonify({"error": "Already logged in"}), 400)

    session["user_name"] = user_name
    response = jsonify({"status": "success"})
    response.status_code = 200
    # response.set_cookie("user_name", user_name)
    return make_response(response)
