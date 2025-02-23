from flask import Blueprint, request, jsonify
from flask_cors import CORS
import os
from gemini.think import read_image, read_text, daily_lucky_powder
from models import Tag
from datetime import datetime
from db_instance import db
import uuid
from r2.r2_client import s3


app = Blueprint('gemini', __name__)
CORS(app, supports_credentials=True, origins=["http://localhost"])

UPLOAD_FOLDER = 'pictures'

@app.route("/process", methods=["POST"])  # 画像もテキストも処理するエンドポイント
def process_uploaded_data():
    print(request.files)
    # 画像のアップロードチェック
    if 'file' in request.files:  # 画像が送られてきた場合
        file = request.files['file']
        if file.filename == '':
            return "No selected file", 400

        # 許可する拡張子をリストに指定
        allowed_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'] #JPEG, PNG, GIF, BMP, WEBPの拡張子を許可

        # ファイル名と拡張子を分離
        _, file_extension = os.path.splitext(file.filename)

        # 拡張子を小文字に変換して比較
        check_file_extension = file_extension.lower() #大文字の拡張子の場合でも弾かれないようにするため
        # 拡張子が許可されたリストにあるか確認
        if check_file_extension not in allowed_extensions:
            return "Invalid file type. Only PNG, JPG, JPEG, and GIF, BMP, WEBP are allowed.", 400

        # 新しいファイル名を生成し、元の拡張子を追加
        new_filename = str(uuid.uuid4()) + file_extension
        file_path = f"uploads/{new_filename}"
        try:
            # Cloudflare R2 にアップロード
            s3.upload_fileobj(file, os.getenv('R2_BUCKET_NAME'), file_path)

            # Cloudflare R2 から画像を取得
            file_obj = s3.get_object(Bucket=os.getenv('R2_BUCKET_NAME'), Key=file_path)
            file_content = file_obj["Body"].read()

            result, tag_result = read_image(file_content)  # 画像処理を行う

        except Exception as e:
            return jsonify({"error": str(e)}), 500

        # データベースでタグを探す
        datetime_obj = datetime.now()
        existing_tag = Tag.query.filter_by(tag=tag_result).first()
        file_path = os.path.join(os.getenv("R2_PUBLIC_URL"), file_path)
        print(result, file_path)
        if existing_tag:
            return jsonify({"caption": result, "image_path": file_path, "tag": tag_result, "tag_id": existing_tag.tag_id})
        else:
            new_tag = Tag(tag=tag_result, datetime=datetime_obj)
            db.session.add(new_tag)  # 新しいタグをデータベースに追加
            db.session.commit()  # コミットして保存
            return jsonify({"caption": result, "image_path": file_path, "tag": tag_result, "tag_id": new_tag.tag_id})

    # テキストのアップロードチェック
    elif request.is_json and 'text' in request.json:  # テキストが送られてきた場合
        data = request.json
        text = data['text']
        result, tag_result = read_text(text)  # テキスト処理を行う

        file_path = os.path.join(os.getenv("R2_PUBLIC_URL"), "uploads/no_image.png")

        # データベースでタグを探す
        existing_tag = Tag.query.filter_by(tag=tag_result).first()

        if existing_tag:
            return jsonify({"caption": result, "image_path": file_path, "tag": tag_result, "tag_id": existing_tag.tag_id})
        else:
            datetime_obj = datetime.now()
            new_tag = Tag(tag=tag_result, datetime=datetime_obj)
            db.session.add(new_tag)  # 新しいタグをデータベースに追加
            db.session.commit()  # コミットして保存
            return jsonify({"caption": result, "image_path": file_path, "tag": tag_result, "tag_id": new_tag.tag_id})

    return "Invalid data provided", 400  # どちらでもない場合はエラーを返す

@app.route("/daily_lucky_powder", methods=["GET"]) #占いを行う際に動作する
def get_daily_lucky_powder():
    result = daily_lucky_powder() #geminiからテキスト形式で返される
    return jsonify({"caption": result})
