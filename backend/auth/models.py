from app import db
from werkzeug.security import generate_password_hash

class User(db.Model):
    __tablename__ = "profile"
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String, index=True)
    password_hash = db.Column(db.String)
    datetime = db.Column(db.DateTime)

    @property
    def password(self):
        raise AttributeError("読み取り不可")
    
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
