from app import db
from werkzeug.security import generate_password_hash

class User(db.Model):
    __tablename__ = "profile"
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String, index=True)
    password_hash = db.Column(db.String)
    datetime = db.Column(db.DateTime)

    @property
    def password(self):
        raise AttributeError("読み取り不可")

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

class Image(db.Model):
    __tablename__ = "image"
    image_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("profile.user_id"))
    image_path = db.Column(db.String)
    datetime = db.Column(db.DateTime)

    user = db.relationship("User", backref="images")

class Text(db.Model):
    __tablename__ = "text"
    text_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("profile.user_id"))
    text = db.Column(db.String)
    datetime = db.Column(db.DateTime)

    user = db.relationship("User", backref="texts")
