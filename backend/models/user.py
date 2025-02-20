from app import db
from werkzeug.security import generate_password_hash
from datetime import datetime

class User(db.Model):
    __tablename__ = "profile"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String, index=True)
    password_hash = db.Column(db.String)
    datetime = db.Column(db.DateTime)

    def set_password(self, password):
        # パスワードをハッシュ化して保存
        self.password_hash = generate_password_hash(password)
        self.datetime = datetime.now()

    def save(self):
        db.session.add(self)
        db.session.commit()

