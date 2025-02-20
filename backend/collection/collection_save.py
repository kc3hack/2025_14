from flask import session, make_response, jsonify
from models import Image, Tag
from datetime import datetime

def save(data):
    from db_instance import db

    if 'user_name' not in session:
        return f'Logged in as {session["user_name"]}', 400

    # dataに必要な形式がないならエラー
    if not data or "user_id" not in data or "image_name" not in data or "caption" not in data or "tag_id" not in data:
        return "Not enough parameter", 400

    # 受け取ったデータから保存するデータを取得
    user_id = data["user_id"]
    image_name = data["image_name"]
    caption = data["caption"]
    tag_id = data["tag_id"]
    # 現在時刻を取得
    datetime_obj = datetime.now()

    # Imageクラスでデータをインスタンス化
    image_data = Image(user_id=user_id, image_name=image_name, caption=caption, tag_id=tag_id, datetime=datetime_obj)
    db.session.add(image_data)  # ImageをDBに追加
    db.session.commit()         # 追加を適用

    return "success"