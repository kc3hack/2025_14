from flask import Flask, make_response, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_session import Session
from config import config
from db_instance import db
import os
from datetime import timedelta

def create_app(config_key):
    app = Flask(__name__)
    app.secret_key = os.getenv('AUTH_SECRET_KEY')
    app.config.from_object(config[config_key])
    app.config["SECRET_KEY"] = os.getenv("AUTH_SECRET_KEY")
    app.config["SESSION_TYPE"] = "filesystem"
    app.config["SESSION_PERMANENT"] = True
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7)
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SECURE"] = os.getenv("FLASK_ENV") == "production"
    app.config["SESSION_COOKIE_SAMESITE"] = "None"
    app.config["SESSION_COOKIE_DOMAIN"] = "frontend-latest-j2w6.onrender.com"

    Session(app)
    db.init_app(app)
    Migrate(app, db)
    CORS(app, supports_credentials=True, origins=["https://frontend-latest-j2w6.onrender.com"], allow_headers=["Content-Type", "Authorization"])

    @app.before_request
    def handle_options():
        if request.method == "OPTIONS":
            response = make_response()
            response.headers["Access-Control-Allow-Origin"] = "https://frontend-latest-682o.onrender.com"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            response.headers["Access-Control-Allow-Credentials"] = "true"
            return response, 200

    from blueprint import auth, gemini, collection
    app.register_blueprint(auth.auth)
    app.register_blueprint(collection.collection, url_prefix="/collection")
    app.register_blueprint(gemini.app)
    return app

if __name__ == '__main__':
    app = create_app('local')
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
