from flask import Flask

def create_app():
    app = Flask(__name__)

    # Import routes
    from .routes import api

    # Register the blueprint
    app.register_blueprint(api)

    return app
