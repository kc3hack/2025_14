from flask import jsonify
from models import User

def reset_password(data):
    if not data or "user_name" not in data or "new_password" not in data:
        return jsonify({"error": "Missing user_name or new_password"}), 400

    user_name = data["user_name"]
    new_password = data["new_password"]

    user = User.query.filter_by(user_name=user_name).first()
    if not user:
        return jsonify({"error": "User does not exist"}), 400

    user.set_password(new_password)
    user.save()

    return jsonify({"status": "success"}), 200
