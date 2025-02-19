from flask import Blueprint, request, jsonify
import os
from gemini.think import read_image, read_text, daily_lucky_powder
from models import Tag
from datetime import datetime

app = Blueprint('gemini', __name__)

UPLOAD_FOLDER = 'pictures'

@app.route("/prosess_image", methods=["POST"]) #画像を受け取った場合に動作する
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400

    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400

    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        result, tag_result = read_image(file_path) #画像パスを投げるとgeminiからテキスト形式で返される

        datetime_obj = datetime.now() #現在の時間の取得
        existing_tag = Tag.query.filter_by(tag=tag_result).first()# 最初の一致するレコードを取得
        if existing_tag: #すでにデータベースにタグが存在する場合
            return jsonify({"result": result, "image_path": file_path, "tag_name": tag_result, "ID": existing_tag.id}) #geminiの出力結果と画像パス、タグの名前をjson形式で返す
        else:
            datetime_obj = datetime.now() #現在の時間の取得
            new_tag = Tag(tag=tag_result, datetime=datetime_obj)
            Tag.session.add(new_tag)  # セッションに新しいタグを追加
            Tag.session.commit()  # 変更をコミットしてデータベースに保存
            return jsonify({"result": result, "image_path": file_path, "tag_name": tag_result, "ID": new_tag.id}) #geminiの出力結果と画像パス、タグの名前をjson形式で返す

@app.route("/process_text", methods=["POST"]) #テキストを受け取った場合に動作する
def process_uploaded_text():
    data = request.json
    if not data or 'text' not in data:
        return "No text provided", 400

    text = data['text']
    result, tag_result = read_text(text) #テキストを投げるとgeminiからテキスト形式で返される

    existing_tag = Tag.query.filter_by(tag=tag_result).first()# 最初の一致するレコードを取得
    if existing_tag: #すでにデータベースにタグが存在する場合
        return jsonify({"result": result, "tag_name": tag_result, "ID": existing_tag.id}) #geminiの出力結果とタグの名前をjson形式で返す
    else: #データベースにタグが存在しない場合
        datetime_obj = datetime.now() #現在の時間の取得
        new_tag = Tag(tag=tag_result, datetime=datetime_obj)
        Tag.session.add(new_tag)  # セッションに新しいタグを追加
        Tag.session.commit()  # 変更をコミットしてデータベースに保存
        return jsonify({"result": result, "tag_name": tag_result, "ID": new_tag.id}) #geminiの出力結果とタグの名前をjson形式で返す

#upload_file()とprocess_uploaded_text()の処理を一つにまとめる
@app.route("/process", methods=["POST"])  # 画像もテキストも処理するエンドポイント
def process_uploaded_data():
    # 画像のアップロードチェック
    if 'file' in request.files:  # 画像が送られてきた場合
        file = request.files['file']
        if file.filename == '':
            return "No selected file", 400

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        result, tag_result = read_image(file_path)  # 画像処理を行う

        # データベースでタグを探す
        datetime_obj = datetime.now()
        existing_tag = Tag.query.filter_by(tag=tag_result).first()

        if existing_tag:
            return jsonify({"result": result, "image_path": file_path, "tag_name": tag_result, "ID": existing_tag.id})
        else:
            new_tag = Tag(tag=tag_result, datetime=datetime_obj)
            Tag.session.add(new_tag)  # 新しいタグをデータベースに追加
            Tag.session.commit()  # コミットして保存
            return jsonify({"result": result, "image_path": file_path, "tag_name": tag_result, "ID": new_tag.id})

    # テキストのアップロードチェック
    elif request.is_json and 'text' in request.json:  # テキストが送られてきた場合
        data = request.json
        text = data['text']
        result, tag_result = read_text(text)  # テキスト処理を行う

        # データベースでタグを探す
        existing_tag = Tag.query.filter_by(tag=tag_result).first()

        if existing_tag:
            return jsonify({"result": result, "tag_name": tag_result, "ID": existing_tag.id})
        else:
            datetime_obj = datetime.now()
            new_tag = Tag(tag=tag_result, datetime=datetime_obj)
            Tag.session.add(new_tag)  # 新しいタグをデータベースに追加
            Tag.session.commit()  # コミットして保存
            return jsonify({"result": result, "tag_name": tag_result, "ID": new_tag.id})

    return "Invalid data provided", 400  # どちらでもない場合はエラーを返す

@app.route("/daily_lucky_powder", methods=["GET"]) #占いを行う際に動作する
def get_daily_lucky_powder():
    result = daily_lucky_powder() #geminiからテキスト形式で返される
    return jsonify({"result": result})
