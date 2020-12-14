from . import app
from . import game, clients, definition


@app.route('/gaemstate')
def gameState():
    return dict(
        users=clients.all(),
        definitions=definition.all(),
        game=game.all())


@app.route('/')
def index():
    return app.send_static_file('index.html')
