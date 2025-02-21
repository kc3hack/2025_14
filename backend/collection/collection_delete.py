from flask import jsonify
from r2.r2_client import s3, R2_BUCKET_NAME

UPLOAD_FOLDER = 'pictures'

def delete(data):

    if not data or "image_path" not in data: # dataに必要な形式がないならエラー
        return "Not enough parameter", 400

    # 画像へのパスを取得
    image_path = data["image_path"]

    try:
        # **Cloudflare R2 からファイルを削除**
        s3.delete_object(Bucket=R2_BUCKET_NAME, Key=image_path)
        return jsonify({"message": f"Deleted {image_path} successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
