from . import clients
from . import game
from .user import name, oldName, points
from . import definition


CONNECT = 'connect'
DISCONNECT = 'disconnect'

# client -> server
REGISTER_PLAYER = 'register_user'               # 'name'
BEGIN_GAME = 'begin_game'
BEGIN_GAME_CLAIMING_HOST = 'begin_game_claiming_host'
HOST_SUBMITS_WORD = 'host_submits_word'         # 'word'
PLAYER_SUBMITS_DEFN = 'player_submits_defn'     # 'definition'
VOTE = 'vote'                                   # 'DefnId'


# server -> client
def ON_CONNECT():
    return [
        "on_connect",
        dict(
            host=name(game.host()),
            hostWord=game.hostWord(),
            definitions=[
                dict(
                    votes=definition.countVotes(d),
                    text=definition.text(d),
                    _id=definition._id(d))
                for d in definition.getDefinitions().values()],
            stage=game.stage(),
            users=[dict(name=name(u),
                        oldName=oldName(u),
                        points=points(u)) for u in clients.getUsers()])]


def PLAYER_DISCONNECTS():
    return [
        'user_disconnects', dict()
    ]


def PLAYER_REGISTERED():
    user = clients.getUser()
    return [
        'user_registered',
        dict(name=name(user),
             oldName=oldName(user),
             points=points(user))
    ]


def GAME_BEGUN():
    return [
        'game_begun',
        dict(host=name(game.host()),
             stage=game.stage(),
             users=[dict(name=name(u),
                         oldName=oldName(u),
                         points=points(u))
                    for u in clients.getUsers()])
    ]


def HOST_SUBMITTED_WORD():
    return [
        'host_submitted_word',
        dict(word=game.hostWord(),
             stage=game.stage())
    ]


def PLAYER_SUBMITTED_DEFN():
    defn = definition.getDef()
    return [
        'player_submitted_defn',
        dict(percent=game.percent_defn_submitted(),
             definition=dict(text=definition.text(defn),
                             _id=definition._id(defn)))
    ]


def ALL_DEFNS_SUBMITTED():
    return [
        'all_defns_submitted',
        dict()
    ]


def PLAYER_VOTED(defn):
    return [
        'player_voted',
        dict(_id=definition._id(defn),
             votes=definition.countVotes(defn))
    ]


def ALL_PLAYERS_VOTED():
    return [
        'all_players_voted',
        dict(summary=[
            dict(name=name(u),
                 host=u == game.host(),
                 text=definition.text(definition.getDef(u)),
                 votedBy=[name(vu) for vu in definition.whoVotedFor(u)],
                 points=game.calculatePointsFor(u))
            for u in clients.getUsers()])
    ]
