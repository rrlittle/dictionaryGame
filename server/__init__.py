from flask_socketio import SocketIO
from flask import Flask
from flask_cors import CORS
from os import environ

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)
app.config['SECRET_KEY'] = 'secret'
app.debug = True
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)

from . import events
from . import rest
