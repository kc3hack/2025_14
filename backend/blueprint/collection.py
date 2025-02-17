from flask import Blueprint
from flask import request, make_response, jsonify

collection = Blueprint('collection', __name__)

@collection.route("/collection", methods=['GET', 'POST'])
def get():
    # フロントからjson形式でデータを受け取る
    data = request.get_json()
    # 受け取ったデータからID情報を抽出する
    id = data['id']

    # 仮で結果をIDとする
    res = id
    # 結果の応答を辞書で作成
    response = {'result': res}

    # 辞書をjson形式として結果を返す
    return make_response(jsonify(response))

@collection.route("/save", methods=['GET'])
def save():
    return 'save'

@collection.route("/delete", methods=['GET'])
def delete():
    return 'delete'