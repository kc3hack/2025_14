from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import config
from db_instance import db
from session.secret_key import secretKey

def create_app(config_key):
    app = Flask(__name__)
    app.secret_key = secretKey
    app.config.from_object(config[config_key])
    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    from blueprint import auth
    from blueprint import collection
    from models import user, image, text, tag
    app.register_blueprint(auth.auth)
    app.register_blueprint(collection.collection, url_prefix="/collection")

    return app


if __name__ == '__main__':
    app = create_app('local')
    app.run()
