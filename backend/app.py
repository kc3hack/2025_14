from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from extensions import db
from config import config

def create_app(config_key):
    app = Flask(__name__)
    app.config.from_object(config[config_key])
    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    from blueprint import auth
    from blueprint import collection
    from auth import models
    app.register_blueprint(auth.auth)
    app.register_blueprint(collection.collection, url_prefix="/collection")

    return app


if __name__ == '__main__':
    app = create_app('local')
    app.run()
