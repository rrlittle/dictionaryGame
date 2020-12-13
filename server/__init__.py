from flask_socketio import SocketIO
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, cors_allowed_origins="*")

from . import events

# from flask import Flask, request
# from flask_socketio import SocketIO, emit
# from flask_cors import CORS
# from random import choice


# players = {
#     'Russell': {
#         "order": 0, 'points': 4
#     }
# }

# host = None

# hostWord = None


# submissions = 0


# def chooseHost():
#     global host
#     h = host
#     if host is None:
#         h = choice([n for n in players])
#     host = h
#     return h


# @socketio.on("connect")
# def connect():
#     print('new client connected', request.sid)
#     emit('onConnect', dict(players=players, host=host))


# @socketio.on('disconnect')
# def disconnect():
#     print('client disconnected', request.sid)


# def createNewUser(name):
#     newPlayer = dict(name=name, order=len(players), points=0)
#     players[name] = newPlayer
#     return newPlayer


# @socketio.on('registerUser')
# def registerUser(names):
#     print('received registerUser: ' + str(names))
#     name = names['name']
#     oldName = names['currentName']
#     players.pop(oldName, None)
#     socketio.emit(
#         'userRegistered',
#         dict(newPlayer=createNewUser(name),
#              oldName=oldName))


# @socketio.on('submitWord')
# def submitWord(word):
#     print('host has submitted a word', word)
#     global hostWord
#     hostWord = word
#     socketio.emit('wordSubmitted', word)


# @socketio.on('submitDefinition')
# def submitDefinition(defn):
#     print(f'player has submitted a defintion for word ({hostWord}): {defn}')
#     socketio.emit('defintionSubmitted',
#                   dict(votes=0,
#                        user='user',
#                        definition=defn))
#     global submissions
#     submissions += 1
#     if submissions >= len(players):
#         socketio.emit('onWritingDefinitionsDone', None)
