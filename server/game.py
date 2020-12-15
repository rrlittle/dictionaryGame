from random import choice
from .clients import getUsers
from .definition import (getDefinitions, getVotes, clearDefinitions,
                         whoVotedFor, whoDidUserVoteFor)
from .user import incrementScore

game = None


def begin(host=None):
    global game
    users = getUsers()
    clearDefinitions()
    game = dict(players=users,
                hostWord=None,
                host=choice(users) if host is None else host)


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
    if game:
        for u in getUsers():
            incrementScore(u, calculatePointsFor(u))
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


def calculatePointsFor(u):
    pts = 0
    if(u == host()):
        # if user is host -> if no one guessed 2 pts
        if len(whoVotedFor(u)) == 0:
            pts = 2
    else:
        # is user is player:
        #   if someone votes for you 1pt
        #   if you vote for host's def -> 2pts
        pts = len(whoVotedFor(u))
        uVotedFor = whoDidUserVoteFor(u)
        if (uVotedFor == host()):
            pts += 2
    return pts
