from app import db

class Image(db.Model):
    __tablename__ = "image"
    image_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("profile.user_id"))
    image_path = db.Column(db.String)
    datetime = db.Column(db.DateTime)

    user = db.relationship("User", backref="images")
