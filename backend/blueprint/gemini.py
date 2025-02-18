from flask import Flask, request, jsonify
import os
from __init__py import read_image, read_text, daily_lucky_powder
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORSの設定

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/upload", methods=["POST"])
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

if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True, port=5001, host='0.0.0.0')
