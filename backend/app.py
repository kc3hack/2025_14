from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_session import Session
from config import config
from db_instance import db
import os

def create_app(config_key):
    app = Flask(__name__)
    app.secret_key = os.getenv('AUTH_SECRET_KEY')
    app.config.from_object(config[config_key])
    app.config['SESSION_TYPE'] = 'filesystem'
    Session(app)
    db.init_app(app)
    Migrate(app, db)
    CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

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
