from flask import session, make_response, jsonify
from models import Image, Tag

def get(data):

    if 'username' not in session:
        return f'Logged in as {session["username"]}', 400

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