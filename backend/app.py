from flask import Flask, render_template, Blueprint
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
    
    from auth import views
    app.register_blueprint(views.auth)
    return app
