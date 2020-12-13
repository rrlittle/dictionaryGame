from unittest.mock import patch
import flask
from server import game, clients


@patch('flask.request')
def test_game(request):
    assert not game.playing(), 'game should not be playing yet'
    clients.join()
    print(clients.getUsers())


test_game()
