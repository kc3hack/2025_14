from app import db

class Text(db.Model):
    __tablename__ = "text"
    text_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("profile.user_id"))
    text = db.Column(db.String)
    datetime = db.Column(db.DateTime)

    user = db.relationship("User", backref="texts")
