from random import choice
from .clients import getUser, getUsers


game = None


def playing():
    return game is not None


def begin():
    global game
    users = getUsers()
    game = dict(players=users,
                hostWord=None,
                defns={},
                hasVoted=set(),
                host=choice(users))


def end():
    global game
    game = None


def host():
    return game['host']


def record_host_word(word):
    game['hostWord'] = word


def hostWord():
    return game['hostWord']


def record_submitted_defn(defn):
    u = getUser()
    defId = hash(u._id)
    game['defns'][defId] = dict(text=defn, user=u, votes=0)


def defn():
    u = getUser()
    defId = hash(u._id)
    return game['defns'].get(defId, {})


def all_defn_submitted():
    return len(game['defns']) >= len(game['players'])


def percent_defn_submitted():
    return 100 * (len(game['defns']) / len(game['players']))


def vote(data):
    u = getUser()
    defId = data.get('id')  # the id definition we're voting for
    game['defns'][defId]['votes'] += 1
    game['hasVoted'].add(u)
    return defId


def all_votes_submitted():
    return len(game['hasVoted']) >= (len('players') - 1)  # host doens't vote


def getVotes():
    return [d for d in game['defns'].values()]
