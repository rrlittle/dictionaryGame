from server import app, socketio
from server.definition import getDefinitions
from server.contracts import *
from functools import partial


def getRecieved(client):
    recvd = client.get_received()
    return [(res['name'], res['args'][0]) for res in recvd]


def client():
    c = socketio.test_client(app)
    g = partial(getRecieved, c)
    return c, g


def ctxt(func, url='/', data=None):
    def wrapped(*args, **kwargs):
        func(*args, **kwargs)
    return wrapped


def test(getter, expecteds, msg=""):
    actuals = getter()
    assert len(actuals) == len(expecteds)
    for i, res in enumerate(actuals):
        event, data = expecteds[i]
        actual_event, actual_data = res
        assert actual_event == event, (f'_{msg}_ event is not as expected, '
                                       f'{actual_event} != {event}')

        assert actual_data == data, (f'_{msg}_ data wrong for _{event}_, \n'
                                     f'{actual_data} \n!=\n {data}')
    return [a[1] for a in actuals]


@ctxt
def test_game():
    c1, g1 = client()
    test(g1, [(ON_CONNECT, dict(users=[]))], 'c1 connect')
    c1.emit(REGISTER_PLAYER, 'c1')

    c1User, = test(g1, [(PLAYER_REGISTERED, dict(oldName=None, name='c1'))])
    c1Name = c1User['name']

    c2, g2 = client()
    test(g2, [(ON_CONNECT, dict(users=[c1User]))], 'c2 connects')

    c1.emit(BEGIN_GAME)
    test(g1, [(GAME_BEGUN, dict(host=c1Name))])
    test(g2, [(GAME_BEGUN, dict(host=c1Name))])

    hostWord = 'hostWord'
    c1.emit(HOST_SUBMITS_WORD, hostWord)
    test(g1, [(HOST_SUBMITTED_WORD, dict(word=hostWord))])
    test(g2, [(HOST_SUBMITTED_WORD, dict(word=hostWord))])

    c1Defn = "c1 definition"
    c1.emit(PLAYER_SUBMITS_DEFN, c1Defn)
    defn_id = list(getDefinitions().keys())[0]
    test(g1,
         [
             (PLAYER_SUBMITTED_DEFN,  # tell everyone a player has submitted
              dict(
                  percent=100.0,
                  definition=dict(
                      text=c1Defn,
                      _id=defn_id))),
             # this is the last person. so notify everyone subissions are done
             (ALL_DEFNS_SUBMITTED, {})
         ])

    c1.emit(VOTE, defn_id)
    test(g1,
         [
             (PLAYER_VOTED, dict()),
             (ALL_PLAYERS_VOTED, dict())
         ])


test_game()
