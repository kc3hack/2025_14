from models import Image, Tag
from flask import Blueprint
from flask import request, make_response, jsonify
from datetime import datetime

collection = Blueprint("collection", __name__)

@collection.route("/get", methods=["POST"])
def get():

    # フロントからjson形式でデータを受け取る
    data = request.get_json()

    if not data or "user_id" not in data: # dataに必要な形式がないならエラー
        return "Not enough parameter", 400

    # ID情報を抽出する
    user_id = data["user_id"]

    # DBのImageモデルからuser_idで絞り込んでデータを取得
    response = Image.query.filter_by(user_id=user_id)

    result_list = [] # 検索結果を保存するリスト
    for res in response:

        # tag_idと紐づいたtagを取得している
        tag = Tag.query.get(res.tag_id)

        result_list.append([res.image_path, res.caption, tag.tag])

    # 検索結果をjsonに変換して返す
    return make_response(jsonify({"result": result_list}))

@collection.route("/save", methods=["POST"])
def save():
    from db_instance import db

    # フロントからjson形式でデータを受け取る
    data = request.get_json()

    # dataに必要な形式がないならエラー
    if not data or "user_id" not in data or "image_path" not in data or "caption" not in data or "tag_id" not in data:
        return "Not enough parameter", 400

    # 受け取ったデータから保存するデータを取得
    user_id = data["user_id"]
    image_path = data["image_path"]
    caption = data["caption"]
    tag_id = data["tag_id"]
    # 現在時刻を取得
    datetime_obj = datetime.now()

    # Imageクラスでデータをインスタンス化
    image_data = Image(user_id=user_id, image_path=image_path, caption=caption, tag_id=tag_id, datetime=datetime_obj)
    db.session.add(image_data)  # ImageをDBに追加
    db.session.commit()         # 追加を適用

    return "success"

@collection.route("/delete", methods=["POST"])
def delete():
    import os
    data = request.get_json()

    if not data or "image_path" not in data: # dataに必要な形式がないならエラー
        return "Not enough parameter", 400

    # 画像へのパスを取得
    image_path = data["image_path"]

    # パス先にあるのがファイルか確認し，ファイルでなければエラーを返す
    if not os.path.isfile(image_path):
        return "No such File", 400

    # パス先のファイルを削除
    os.remove(image_path)

    return "success"