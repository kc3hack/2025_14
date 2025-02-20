from flask import jsonify, session
from models import User

def delete_account(data):
    # ユーザー名が指定されていない場合はエラー
    if "user_name" not in data:
        return jsonify({"error": "user_name is required"}), 400

    # ユーザー名が指定されている場合は削除
    user_name = data["user_name"]
    user = User.query.filter_by(user_name=user_name).first()
    if not user:
        return jsonify({"error": "User does not exist"}), 400
    if 'user_name' in session:
        session.pop('user_name', None)
    user.delete()
    user.save()
    return jsonify({"status": "success"}), 200
