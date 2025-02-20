from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import config
from db_instance import db
from authentication.secret_key import secretKey

def create_app(config_key):
    app = Flask(__name__)
    app.secret_key = secretKey
    app.config.from_object(config[config_key])
    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    from blueprint import auth,gemini
    from blueprint import collection
    app.register_blueprint(auth.auth)
    app.register_blueprint(collection.collection, url_prefix="/collection")

    app.register_blueprint(gemini.app)
    return app


if __name__ == '__main__':
    app = create_app('local')
    app.run()
