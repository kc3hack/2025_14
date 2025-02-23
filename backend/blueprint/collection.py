from flask import request
from flask import Blueprint
from flask_cors import CORS
from collection import collection_get, collection_save, collection_delete
from flask_cors import cross_origin

collection = Blueprint("collection", __name__)
CORS(collection, supports_credentials=True, origins=["http://localhost"])

@collection.route("/get", methods=["POST"])
@cross_origin(origins=["http://localhost:3000"])
def get():
    return collection_get.get(request.get_json())

@collection.route("/save", methods=["POST"])
@cross_origin(origins=["http://localhost:3000"])
def save():
    return collection_save.save(request.get_json())

@collection.route("/delete", methods=["POST"])
def delete():
    return collection_delete.delete(request.get_json())
