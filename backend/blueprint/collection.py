from flask import request
from flask import Blueprint
from collection import collection_get, collection_save, collection_delete

collection = Blueprint("collection", __name__)

@collection.route("/get", methods=["POST"])
def get():
    return collection_get.get(request.get_json())

@collection.route("/save", methods=["POST"])
def save():
    return collection_save.save(request.get_json())

@collection.route("/delete", methods=["POST"])
def delete():
    return collection_delete.delete()