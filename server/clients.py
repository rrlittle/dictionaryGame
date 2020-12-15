from flask import request
from .user import newUser, register_name, name, _id, update_id

clients = {}


def join(connectingName=None):
    existingUsersByName = {name(u): _id(u) for u in clients.values()}
    if connectingName and connectingName in existingUsersByName:
        user = clients[existingUsersByName[connectingName]]
        print('updating user', user, request.sid)
        update_id(user)
        del clients[existingUsersByName[connectingName]]
    else:
        user = newUser()
    clients[request.sid] = user
    return user


def getUser():
    return clients.get(request.sid)


def leave():
    return clients.pop(request.sid, None)


def update_user(name):
    '''user is registering their name'''
    user = clients.get(request.sid)
    if(user):
        return register_name(user, name)


def getUsers():
    return [c for c in clients.values() if name(c) is not None]


def all():
    return clients
