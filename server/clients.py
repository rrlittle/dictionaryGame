from flask import request
from .user import newUser, register_name, name

clientsBySid = {}


def join():
    user = newUser()
    clientsBySid[request.sid] = user
    return user


def getUser():
    return clientsBySid.get(request.sid)


def leave():
    return clientsBySid.pop(request.sid, None)


def update_user(name):
    '''user is registering their name'''
    user = clientsBySid.get(request.sid)
    if(user):
        return register_name(user, name)


def getUsers():
    return [c for c in clientsBySid.values() if name(c) is not None]
