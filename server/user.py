from flask import request


class User():
    name = None
    oldName = None
    _id = None

    def register_name(self, name):
        if name == self.name:
            return
        self.oldName = self.name
        self.name = name
        self._id = request.sid
