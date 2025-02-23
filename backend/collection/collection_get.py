import os
from flask import session, make_response, jsonify
from models import Image, Text, Tag, User

def get(data):

    user_name = session.get("user_name")
    print('-'*50)
    print(user_name)
    if user_name is None:
        return f'User not Logged in as {user_name}', 400

    # ID情報を抽出する
    user = User.query.filter_by(user_name=user_name).first()

    # DBのImageモデルからuser_idで絞り込んでデータを取得

    response_Image = Image.query.filter_by(user_id=user.user_id)
    response_Text = Text.query.filter_by(user_id=user.user_id)

    result_list = [] # 検索結果を保存するリスト

    # 画像のDBからの検索結果を整理する
    if response_Image :
        for res in response_Image:

            # tag_idと紐づいたtagを取得している
            tag = Tag.query.get(res.tag_id)

            result_list.append([res.image_path, res.caption, tag.tag])

    # テキストのDBからの検索結果を整理する
    if response_Text :
        file_path = os.path.join(os.getenv('R2_PUBLIC_URL'), 'uploads', 'no_image.png')
        for res in response_Text:

            # tag_idと紐づいたtagを取得している
            tag = Tag.query.get(res.tag_id)

            result_list.append([file_path, res.caption, tag.tag])

    if not result_list:
        return jsonify({"error": "Not Enough Data"}), 500

    # 検索結果をjsonに変換して返す
    print(result_list)
    return make_response(jsonify({"result": result_list}))
