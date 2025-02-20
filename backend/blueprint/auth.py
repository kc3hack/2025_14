from flask import Blueprint, redirect, url_for, request, session, jsonify
from authentication import auth_register, auth_login, auth_reset_password, auth_delete_account

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
    return jsonify({"error": "Request must be JSON"}), 400

@auth.route("/login", methods=["POST"])
def login():
    if request.is_json:
        # ログインを行う
        # ログインに成功した場合は json({status: "success"}), 200 を返す
        # ログインに失敗した場合は json({error: "error message"}), 400 を返す
        return auth_login.login(request.get_json())
    return jsonify({"error": "Request must be JSON"}), 400

@auth.route("/logout", methods=["POST"])
def logout():
    session.pop("user_name", None)
    return jsonify({"status": "success"}), 200

@auth.route("/reset_password", methods=["POST"])
def reset_password():
    # パスワードをリセットする
    # リセットに成功した場合は json({status: "success"}), 200 を返す
    # リセットに失敗した場合は json({error: "error message"}), 400 を返す
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}, 400)
    return auth_reset_password.reset_password(request.get_json())

@auth.route("delete_account", methods=["POST"])
def delete_account():
    # アカウントを削除する
    # 削除に成功した場合は json({status: "success"}), 200 を返す
    # 削除に失敗した場合は json({error: "error message"}), 400 を返す
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}, 400)
    return auth_delete_account.delete_account(request.get_json())
