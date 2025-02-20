from flask import Blueprint, request, jsonify
import os
from gemini.think import read_image, read_text, daily_lucky_powder
from models import Tag
from datetime import datetime
from db_instance import db
import uuid

app = Blueprint('gemini', __name__)

UPLOAD_FOLDER = 'pictures'

@app.route("/process", methods=["POST"])  # 画像もテキストも処理するエンドポイント
def process_uploaded_data():
    # 画像のアップロードチェック
    if 'file' in request.files:  # 画像が送られてきた場合
        file = request.files['file']
        if file.filename == '':
            return "No selected file", 400

        # ファイル名と拡張子を分離
        filename, file_extension = os.path.splitext(file.filename)

        # 新しいファイル名を生成し、元の拡張子を追加
        new_filename = str(uuid.uuid4()) + file_extension
        file_path = os.path.join('..', UPLOAD_FOLDER, new_filename)
        file.save(file_path)
        result, tag_result = read_image(file_path)  # 画像処理を行う

        # データベースでタグを探す
        datetime_obj = datetime.now()
        existing_tag = Tag.query.filter_by(tag=tag_result).first()

        if existing_tag:
            return jsonify({"caption": result, "image_name": file_path, "tag": tag_result, "tag_id": existing_tag})
        else:
            new_tag = Tag(tag=tag_result, datetime=datetime_obj)
            db.session.add(new_tag)  # 新しいタグをデータベースに追加
            db.session.commit()  # コミットして保存
            return jsonify({"caption": result, "image_name": file_path, "tag": tag_result, "tag_id": new_tag.tag_id})

    # テキストのアップロードチェック
    elif request.is_json and 'text' in request.json:  # テキストが送られてきた場合
        data = request.json
        text = data['text']
        print(text)
        result, tag_result = read_text(text)  # テキスト処理を行う

        # データベースでタグを探す
        existing_tag = Tag.query.filter_by(tag=tag_result).first()

        if existing_tag:
            return jsonify({"caption": result, "tag": tag_result, "tag_id": existing_tag})
        else:
            datetime_obj = datetime.now()
            new_tag = Tag(tag=tag_result, datetime=datetime_obj)
            db.session.add(new_tag)  # 新しいタグをデータベースに追加
            db.session.commit()  # コミットして保存
            return jsonify({"caption": result, "tag": tag_result, "tag_id": new_tag.tag_id})

    return "Invalid data provided", 400  # どちらでもない場合はエラーを返す

@app.route("/daily_lucky_powder", methods=["GET"]) #占いを行う際に動作する
def get_daily_lucky_powder():
    result = daily_lucky_powder() #geminiからテキスト形式で返される
    return jsonify({"caption": result})
