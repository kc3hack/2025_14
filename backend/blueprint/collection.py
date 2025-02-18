from app import db
from auth.models import User, Image
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

    # # 仮で結果をIDとする
    # res = id
    # # 結果の応答を辞書で作成
    # response = {'result': res}

    # 仮でDBのImageモデルのデータを全て検索して取得する
    response = Image.query.all()
    item = response[0]
    d = {'user_id':item.user_id, 'image_path':item.image_path, 'datetime':item.datetime}

    # 辞書をjson形式として結果を返す
    return make_response(jsonify(d))

@collection.route("/save", methods=['POST'])
def save():
    # フロントからjson形式でデータを受け取る
    data = request.get_json()

    # 受け取ったデータから保存するデータを取得
    user_id = data['user_id']
    image_path = data['image_path']
    datetime_str = data['datetime']
    datetime_obj = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")

    user = User(user_name="kawa", password_hash="hash", datetime=datetime_obj)
    db.session.add(user)
    db.session.commit()

    # Imageクラスでインスタンス化
    image = Image(user_id=user_id, image_path=image_path, datetime=datetime_obj)
    db.session.add(image)
    db.session.commit()

    return 'save'

@collection.route("/delete", methods=['GET'])
def delete():
    from sqlalchemy import text
    # テストのために追加したデータを全て削除する
    db.session.execute(text("PRAGMA foreign_keys=OFF")) # 削除のために外部キー制約を無効化
    for table in reversed(db.metadata.sorted_tables):
        db.session.execute(table.delete())
    db.session.commit()
    db.session.execute(text("PRAGMA foreign_keys=ON"))  # 無効化した外部キー制約を有効化
    return 'delete'