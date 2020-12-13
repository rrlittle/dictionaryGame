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


def getDef():
    u = getUser()
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


def getVotes():
    votes = []
    for d in definitions.values():
        for v in d['votes']:
            votes.append(v)
    return votes


def clearDefinitions():
    global definitions
    definitions = {}


def text(defn):
    return defn.get('text')


def _id(defn):
    return _idFromUser(defn.get('user'))


def _idFromUser(u):
    return f'{hash(user.name(u))}'


def all():
    return definitions
