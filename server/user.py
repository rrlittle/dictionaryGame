from flask import request


def newUser():
    return dict(name=None, oldName=None, _id=request.sid)


def register_name(u, name):
    if(name == u.get('name')):
        return
    u['oldName'] = u.get('name')
    u['name'] = name


def name(u):
    return u.get('name') if u else None


def oldName(u):
    return u.get('oldName') if u else None


def _id(u):
    return u.get('_id') if u else None
