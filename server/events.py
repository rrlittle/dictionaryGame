from flask_socketio import emit
from flask import request
from . import socketio as s
from .contracts import *
from . import clients
from . import game
from . import definition


@s.on(CONNECT)
def connect():
    userName = request.args.get('userName')
    clients.join(userName)
    emit(*ON_CONNECT())  # talk just to the connector


@s.on(DISCONNECT)
def disconnect():
    clients.leave()
    s.emit(*PLAYER_DISCONNECTS())


@s.on(REGISTER_PLAYER)
def register_user(name):
    clients.update_user(name)
    s.emit(*PLAYER_REGISTERED())


@s.on(BEGIN_GAME)
def begin_game(args):
    game.begin()
    s.emit(*GAME_BEGUN())


@s.on(BEGIN_GAME_CLAIMING_HOST)
def begin_game_claiming_host(args):
    game.begin(clients.getUser())
    s.emit(*GAME_BEGUN())


@s.on(HOST_SUBMITS_WORD)
def submit_word(host_word):
    game.record_host_word(host_word)
    s.emit(*HOST_SUBMITTED_WORD())


@s.on(PLAYER_SUBMITS_DEFN)
def submit_defn(def_text):
    definition.createDefn(def_text)
    s.emit(*PLAYER_SUBMITTED_DEFN())
    if(game.all_defn_submitted()):
        s.emit(*ALL_DEFNS_SUBMITTED())


@s.on(VOTE)
def vote(def_id):
    defn = definition.vote(def_id)
    s.emit(*PLAYER_VOTED(defn))
    if game.all_votes_submitted():
        s.emit(*ALL_PLAYERS_VOTED())
        game.end()
