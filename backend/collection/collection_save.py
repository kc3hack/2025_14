from flask import make_response, jsonify
from models import Image, User
from datetime import datetime

def save(data):
    from db_instance import db
    user_id = data.get("user_id")

    if user_id is None:
        return "User not logged in", 400
    print(user_id)

    # dataに必要な形式がないならエラー
    if not data or "image_path" not in data or "caption" not in data or "tag_id" not in data:
        return "Not enough parameter", 400

    # 受け取ったデータから保存するデータを取得
    image_path = data["image_path"]
    caption = data["caption"]
    tag_id = data["tag_id"]
    # 現在時刻を取得
    datetime_obj = datetime.now()

    # Imageクラスでデータをインスタンス化
    image_data = Image(user_id=user_id, image_path=image_path, caption=caption, tag_id=tag_id, datetime=datetime_obj)
    db.session.add(image_data)  # ImageをDBに追加
    db.session.commit()         # 追加を適用

    return jsonify({"status": "success"}), 200
