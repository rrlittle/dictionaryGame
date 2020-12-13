from flask import request
from .user import User

clientsBySid = {}


def join():
    user = User()
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
        return user.register_name(name)


def getUsers():
    return {c for c in clientsBySid.values() if c.name is not None}
