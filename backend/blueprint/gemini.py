from flask import Blueprint, request, jsonify
import os
from gemini.think  import read_image, read_text, daily_lucky_powder

app = Blueprint(__name__)

UPLOAD_FOLDER = 'picutures'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/prosess_image", methods=["POST"]) #画像を受け取った場合に
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400

    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        result = read_image(file_path)
        return jsonify({"result": result})

@app.route("/process_text", methods=["POST"])
def process_uploaded_text():
    data = request.json
    if not data or 'text' not in data:
        return "No text provided", 400
    
    text = data['text']
    result = read_text(text)
    return jsonify({"result": result})

@app.route("/daily_lucky_powder", methods=["GET"])
def get_daily_lucky_powder():
    result = daily_lucky_powder()
    return jsonify({"result": result})
