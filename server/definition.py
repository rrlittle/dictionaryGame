from .clients import getUser
from . import user

definitions = {}


def createDefn(text):
    u = getUser()
    def_id = hash(user._id(u))
    definitions[def_id] = dict(user=u,
                               text=text,
                               votes=[])


def getDefinitions():
    return definitions


def getDef():
    u = getUser()
    return definitions.get(hash(user._id(u)))


def vote(def_id):
    u = getUser()
    definitions[def_id]['votes'].append(u)


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
    return hash(user._id(defn.get('user')))
