from . import app
from . import game, clients, definition


@app.route('/')
def gameState():
    return dict(
        users=clients.all(),
        definitions=definition.all(),
        game=game.all())
