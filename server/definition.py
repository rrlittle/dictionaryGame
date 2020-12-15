from .clients import getUser
from . import user

definitions = {}


def createDefn(text):
    u = getUser()
    def_id = _idFromUser(u)
    definitions[def_id] = dict(user=u,
                               text=text,
                               votes=[])


def getDefinitions():
    return definitions


def getDef(u=None):
    u = getUser() if u is None else u
    return definitions.get(_idFromUser(u))


def vote(def_id):
    u = getUser()
    if(def_id not in definitions):
        print('COULD NOT FIND', def_id)
        print(definitions)
    definitions[def_id]['votes'].append(u)
    return definitions[def_id]


def countVotes(defn):
    return len(defn['votes'])


def getVotes(d=None):
    votes = []
    if(d is None):
        for d in definitions.values():
            for v in d['votes']:
                votes.append(v)
    else:
        votes = d.get('votes')
    return votes


def clearDefinitions():
    global definitions
    definitions = {}


def text(defn):
    return defn.get('text')


def _id(defn):
    return _idFromUser(defn.get('user'))


def whoCreated(d):
    return d.get('user')


def _idFromUser(u):
    return f'{hash(user.name(u))}'


def all():
    return definitions


def whoVotedFor(u):
    d = definitions.get(_idFromUser(u)) or {}
    return getVotes(d) or []


def whoDidUserVoteFor(u):
    for d in definitions.values():
        if u in d.get('votes', []):
            return d.get('user')
