UPLOAD_FOLDER = 'pictures'

def delete(data):
    import os

    if not data or "image_name" not in data: # dataに必要な形式がないならエラー
        return "Not enough parameter", 400

    # 画像へのパスを取得
    image_name = data["image_name"]

    image_path = os.path.join('..', UPLOAD_FOLDER, image_name)

    # パス先にあるのがファイルか確認し，ファイルでなければエラーを返す
    if not os.path.isfile(image_path):
        return "No such File", 400

    # パス先のファイルを削除
    os.remove(image_path)

    return "success"