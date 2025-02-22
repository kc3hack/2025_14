from flask import jsonify
from werkzeug.security import generate_password_hash
from models import User
from db_instance import db
from datetime import datetime

def register(data):
    # jsonにuser_nameとpasswordが含まれているか確認
    if not data or "user_name" not in data or "password" not in data:
        return jsonify({"error": "Missing user_name or password"}), 400

    print(data)

    user_name = data["user_name"]
    password = data["password"]
    date = datetime.now()

    # 重複ユーザーのチェック
    if User.query.filter_by(user_name=user_name).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_password = generate_password_hash(password)

    # ユーザーをデータベースに追加
    user = User(user_name=user_name, password_hash=hashed_password, datetime=date)
    db.session.add(user)
    db.session.commit()

    return jsonify({"status": "success"}), 201
