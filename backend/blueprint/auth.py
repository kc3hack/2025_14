from flask import Blueprint, redirect, url_for, request, session, jsonify
from authentication import auth_register, auth_login

auth = Blueprint("blueprint", __name__)

@auth.route("/")
def home():
    return redirect(url_for("blueprint.register"))

@auth.route("/register", methods=["POST"])
def register():
    if request.is_json:
        # ユーザー登録を行う
        # 登録に成功した場合は json({status: "success"}), 200 を返す
        # ユーザー登録に失敗した場合は json({error: "error message"}), 400 を返す
        return auth_register.register(request.get_json())
    else :
        return jsonify({"error": "Request must be JSON"}), 400

@auth.route("/login", methods=["POST"])
def login():
    if request.is_json:
        # ログインを行う
        # ログインに成功した場合は json({status: "success"}), 200 を返す
        # ログインに失敗した場合は json({error: "error message"}), 400 を返す
        return auth_login.login(request.get_json())
    else:
        return jsonify({"error": "Request must be JSON"}), 400

@auth.route("/logout", methods=["POST"])
def logout():
    session.pop("user_name", None)
    return jsonify({"status": "success"}), 200
