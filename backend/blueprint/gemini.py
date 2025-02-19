from flask import Blueprint, request, jsonify
import os
from gemini.think import read_image, read_text, daily_lucky_powder
from models import Tag
from datetime import datetime

app = Blueprint('gemini', __name__)

UPLOAD_FOLDER = 'pictures'

@app.route("/process", methods=["POST"])  # 画像もテキストも処理するエンドポイント
def process_uploaded_data():
    # 画像のアップロードチェック
    if 'file' in request.files:  # 画像が送られてきた場合
        file = request.files['file']
        if file.filename == '':
            return "No selected file", 400

        file_path = os.path.join("work/space2025_14", app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        result, tag_result = read_image(file_path)  # 画像処理を行う

        # データベースでタグを探す
        datetime_obj = datetime.now()
        existing_tag = Tag.query.filter_by(tag=tag_result).first()

        if existing_tag:
            return jsonify({"caption": result, "image_path": file_path, "tag": tag_result, "tag_id": existing_tag.id})
        else:
            new_tag = Tag(tag=tag_result, datetime=datetime_obj)
            Tag.session.add(new_tag)  # 新しいタグをデータベースに追加
            Tag.session.commit()  # コミットして保存
            return jsonify({"caption": result, "image_path": file_path, "tag": tag_result, "tag_id": new_tag.id})

    # テキストのアップロードチェック
    elif request.is_json and 'text' in request.json:  # テキストが送られてきた場合
        data = request.json
        text = data['text']
        result, tag_result = read_text(text)  # テキスト処理を行う

        # データベースでタグを探す
        existing_tag = Tag.query.filter_by(tag=tag_result).first()

        if existing_tag:
            return jsonify({"caption": result, "tag": tag_result, "tag_id": existing_tag.id})
        else:
            datetime_obj = datetime.now()
            new_tag = Tag(tag=tag_result, datetime=datetime_obj)
            Tag.session.add(new_tag)  # 新しいタグをデータベースに追加
            Tag.session.commit()  # コミットして保存
            return jsonify({"caption": result, "tag": tag_result, "tag_id": new_tag.id})

    return "Invalid data provided", 400  # どちらでもない場合はエラーを返す

@app.route("/daily_lucky_powder", methods=["GET"]) #占いを行う際に動作する
def get_daily_lucky_powder():
    result = daily_lucky_powder() #geminiからテキスト形式で返される
    return jsonify({"caption": result})
