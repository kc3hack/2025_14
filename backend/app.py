from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import config
from db_instance import db
from datetime import timedelta

import os

def create_app(config_key):
    app = Flask(__name__)
    app.secret_key = os.getenv('AUTH_SECRET_KEY')
    app.config.from_object(config[config_key])
    db.init_app(app)
    Migrate(app, db)
    app.config["SECRET_KEY"] = os.getenv("AUTH_SECRET_KEY")
    app.config["SESSION_TYPE"] = "filesystem"
    app.config["SESSION_PERMANENT"] = timedelta(days=7)
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = 'Lax'
    app.config["SESSION_COOKIE_HTTPONLY"] = False
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    from blueprint import auth,gemini
    from blueprint import collection
    app.register_blueprint(auth.auth)
    app.register_blueprint(collection.collection, url_prefix="/collection")

    app.register_blueprint(gemini.app)
    return app


if __name__ == '__main__':
    app = create_app('local')
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
