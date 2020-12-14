from os import environ
from server import socketio, app
if __name__ == '__main__':
    socketio.run(app,
                 debug=True,
                 host='0.0.0.0',
                 port=environ.get('PORT', 5000))
