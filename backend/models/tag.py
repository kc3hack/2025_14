from app import db

class Tag(db.Model):
    __tablename__ = "tag"
    tag_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tag = db.Column(db.String)
    datetime = db.Column(db.DateTime)
