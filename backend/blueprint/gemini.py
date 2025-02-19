from flask import Blueprint, request, jsonify
import os
from gemini.think import read_image, read_text, daily_lucky_powder

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
        result, tag = read_image(file_path) #画像パスを投げるとgeminiからテキスト形式で返される
        return jsonify({"result": result, "image_path": file_path, "tag_name": tag}) #geminiの出力結果と画像パス、タグの名前をjson形式で返す

@app.route("/process_text", methods=["POST"]) #テキストを受け取った場合に動作する
def process_uploaded_text():
    data = request.json
    if not data or 'text' not in data:
        return "No text provided", 400

    text = data['text']
    result, tag = read_text(text) #テキストを投げるとgeminiからテキスト形式で返される
    return jsonify({"result": result, "tag_name": tag}) #geminiの出力結果とタグの名前をjson形式で返す

@app.route("/daily_lucky_powder", methods=["GET"]) #占いを行う際に動作する
def get_daily_lucky_powder():
    result = daily_lucky_powder() #geminiからテキスト形式で返される
    return jsonify({"result": result})
