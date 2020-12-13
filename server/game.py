from random import choice
from .clients import getUsers
from .definition import getDefinitions, getVotes, clearDefinitions

game = None


def begin():
    global game
    users = getUsers()
    clearDefinitions()
    game = dict(players=users,
                hostWord=None,
                host=choice(users))


def stage():
    if not game:
        return 'lobby'
    if all_votes_submitted():
        return 'done'
    if all_defn_submitted():
        return 'voting'
    if hostWord():
        return 'writing'
    return 'choosing'


def end():
    global game
    game = None


def host():
    if game:
        return game['host']


def record_host_word(word):
    if game:
        game['hostWord'] = word


def hostWord():
    if game:
        return game['hostWord']


def all_defn_submitted():
    return len(getDefinitions()) >= len(game['players'] if game else [])


def percent_defn_submitted():
    return 100 * (len(getDefinitions()) / len(game['players'] if game else []))


def all_votes_submitted():
    # host doens't vote
    return len(getVotes()) >= (len(game['players'] if game else []) - 1)


def all():
    return game
