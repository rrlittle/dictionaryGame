from . import app
from . import game, clients, definition, user
from json import dumps, load
from random import choice


def simplifyUid(u):
    return user._id(u)[:3]


def formatUser(u, points=False):
    ident = f'({user.name(u)}:{simplifyUid(u)}'
    ident += f': {user.points(u)}' if points else ''
    return ident


def formatDef(d):
    u = definition.whoCreated(d)
    title = f'''{formatUser(u) if u else None} : {definition.text(d)}'''
    votes = f'{[formatUser(v) for v in definition.getVotes(d)]}'
    return [title, votes]


@ app.route('/gamestate')
def gameState():
    host = game.host()
    state = f'''GAMESTATE
    CLIENTS = '''
    state += '\n' + dumps([formatUser(u, True)
                           for u in clients.all().values()], indent=4)
    state += f''''
    PLAYERS = {[formatUser(u) for u in game.getPlayers()]}
    HOST = {formatUser(host) if host else 'Host Not Set'}
    WORD = {game.hostWord()}
    STAGE = {game.stage()}
    DEFS = '''
    state += '\n' + dumps([formatDef(d)
                           for d in definition.all().values()], indent=4)
    state += f'''
    WHOS LEFT TO VOTE = {[formatUser(u) for u in game.whosLeftToVote()]}
    '''
    return state


@ app.route('/')
def index():
    return app.send_static_file('index.html')


@ app.route('/reset')
def reset():
    game.end()
    return gameState()


@app.route('/word')
def word():
    with open('./server/words.json', 'r') as fp:
        w, d = choice(load(fp))
        return dict(word=w,
                    definition=d)
