from flask_socketio import SocketIO
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret'
app.debug = True
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)

from . import events
from . import rest
