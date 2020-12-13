from random import choice
from .clients import getUsers
from .definition import getDefinitions, getVotes, clearDefinitions

game = None


def playing():
    return game is not None


def begin():
    global game
    users = getUsers()
    clearDefinitions()
    game = dict(players=users,
                hostWord=None,
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


def all_defn_submitted():
    return len(getDefinitions()) >= len(game['players'])


def percent_defn_submitted():
    return 100 * (len(getDefinitions()) / len(game['players']))


def all_votes_submitted():
    return len(getVotes()) >= (len(game['players']) - 1)  # host doens't vote
