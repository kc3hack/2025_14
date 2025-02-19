from app import db
from werkzeug.security import generate_password_hash

class User(db.Model):
    __tablename__ = "profile"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String, index=True)
    password_hash = db.Column(db.String)
    datetime = db.Column(db.DateTime)

