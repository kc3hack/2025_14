from models import User, Image, Tag
from flask import Blueprint
from flask import request, make_response, jsonify
from datetime import datetime

collection = Blueprint('collection', __name__)

@collection.route("/get", methods=['GET', 'POST'])
def get():
    # フロントからjson形式でデータを受け取る
    data = request.get_json()
    # 受け取ったデータからID情報を抽出する
    user_id = data['user_id']

    # DBのImageモデルからuser_idで絞り込んでデータを取得
    response = Image.query.filter_by(user_id=user_id)
    # 画像のパスを保存する辞書を作成
    l = []
    for res in response:
        tag_name = Tag.query.get(res.tag_id)
        l.append([res.image_path, res.caption, tag_name])

    # 辞書をjson形式として結果を返す
    return make_response(jsonify({'result': l}))

@collection.route("/save", methods=['POST'])
def save():
    from db_instance import db

    # フロントからjson形式でデータを受け取る
    data = request.get_json()

    # 受け取ったデータから保存するデータを取得
    user_id = data['user_id']
    image_path = data['image_path']
    caption = data['caption']
    tag_id = data['tag_id']
    datetime_obj = datetime.now()

    user_data = User(user_name="kawa", password_hash="hash", datetime=datetime_obj)
    db.session.add(user_data)
    db.session.commit()
    
    tag_data = Tag(tag_name="お好み焼き")

    # Imageクラスでインスタンス化
    image_data = Image(user_id=user_id, image_path=image_path, caption=caption, tag_id=tag_id, datetime=datetime_obj)
    db.session.add(image_data)
    db.session.commit()

    return 'save'

@collection.route("/delete", methods=['GET'])
def delete():
    from db_instance import db
    from sqlalchemy import text
    # テストのために追加したデータを全て削除する
    db.session.execute(text("PRAGMA foreign_keys=OFF")) # 削除のために外部キー制約を無効化
    for table in reversed(db.metadata.sorted_tables):
        db.session.execute(table.delete())
    db.session.commit()
    db.session.execute(text("PRAGMA foreign_keys=ON"))  # 無効化した外部キー制約を有効化
    return 'delete'