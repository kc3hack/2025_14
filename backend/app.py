from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import config

db = SQLAlchemy()

def create_app(config_key):
    app = Flask(__name__)
    app.config.from_object(config[config_key])
    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    from blueprint import auth
    from models import user, image, text
    app.register_blueprint(auth.auth)
    return app


if __name__ == '__main__':
    app = create_app('local')
    app.run()
