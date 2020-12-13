from server import socketio, app
if __name__ == '__main__':
    app.debug = True
    socketio.run(app, debug=True, logger=True)
