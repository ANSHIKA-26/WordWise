from flask_sqlalchemy import SQLAlchemy

# Initialize the SQLAlchemy instance
db = SQLAlchemy()

class WordData(db.Model):
    __tablename__ = 'word_data'

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(100), nullable=False, unique=True)
    definition = db.Column(db.Text, nullable=False)
    synonyms = db.Column(db.Text, nullable=True)
    examples = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"<WordData {self.word}>"

def init_db(app):
    """
    Initializes the database with the given Flask app.
    """
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///words.db'  # Adjust the database URI as needed
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()  # Create the tables in the database
