from flask import Blueprint, request, jsonify
import os
from gemini.think import read_image, read_text, daily_lucky_powder
from models import Tag

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

        existing_tag = Tag.query.filter_by(tag=tag_result).first()# 最初の一致するレコードを取得
        if existing_tag: #すでにデータベースにタグが存在する場合
            return jsonify({"result": result, "image_path": file_path, "tag_name": tag_result, "ID": existing_tag.id}) #geminiの出力結果と画像パス、タグの名前をjson形式で返す
        else:
            new_tag = Tag(tag=tag_result)
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
        new_tag = Tag(tag=tag_result)
        Tag.session.add(new_tag)  # セッションに新しいタグを追加
        Tag.session.commit()  # 変更をコミットしてデータベースに保存
        return jsonify({"result": result, "tag_name": tag_result, "ID": new_tag.id}) #geminiの出力結果とタグの名前をjson形式で返す

@app.route("/daily_lucky_powder", methods=["GET"]) #占いを行う際に動作する
def get_daily_lucky_powder():
    result = daily_lucky_powder() #geminiからテキスト形式で返される
    return jsonify({"result": result})
