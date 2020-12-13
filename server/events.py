from flask_socketio import emit
from . import socketio as s
from .contracts import *
from . import clients
from . import game
from . import definition


@s.on(CONNECT)
def connect():
    clients.join()
    emit(ON_CONNECT, on_connect())  # talk just to the connector


@s.on(DISCONNECT)
def disconnect():
    clients.leave()
    s.emit(PLAYER_DISCONNECTS, player_disconnects())


@s.on(REGISTER_PLAYER)
def register_user(name):
    clients.update_user(name)
    s.emit(PLAYER_REGISTERED, player_registered())


@s.on(BEGIN_GAME)
def begin_game():
    game.begin()
    s.emit(GAME_BEGUN, game_begun())


@s.on(HOST_SUBMITS_WORD)
def submit_word(host_word):
    game.record_host_word(host_word)
    s.emit(HOST_SUBMITTED_WORD, host_submitted_word())


@s.on(PLAYER_SUBMITS_DEFN)
def submit_defn(def_text):
    definition.createDefn(def_text)
    s.emit(PLAYER_SUBMITTED_DEFN, player_submitted_defn())
    if(game.all_defn_submitted()):
        s.emit(ALL_DEFNS_SUBMITTED, all_defns_submitted())


@s.on(VOTE)
def vote(def_id):
    definition.vote(def_id)
    s.emit(PLAYER_VOTED, player_voted())
    if game.all_votes_submitted():
        s.emit(ALL_PLAYERS_VOTED, all_players_voted())
