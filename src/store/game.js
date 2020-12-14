import { makeAutoObservable, action } from "mobx";
import { register, emit } from "./socket";
import constants from "./constants";

class Game {
    store = null;
    tmpHostWord = "";
    hostWord = "";
    hostWordSubmitDisabled = false;
    stage = null;
    summary = [];

    constructor(store) {
        makeAutoObservable(this);
        this.store = store;

        register(constants.ON_CONNECT, (data) => this.initializeGame(data));
        register(constants.GAME_BEGUN, (data) => this.onBegin(data));
        register(constants.HOST_SUBMITTED_WORD, (data) =>
            this.onHostSubmittedWord(data)
        );
        register(constants.ALL_DEFNS_SUBMITTED, (data) =>
            this.setStage("voting")
        );
        register(constants.ALL_PLAYERS_VOTED, (data) =>
            this.onAllPlayersVoted(data)
        );
    }

    /** EXTERNAL EVENT HANDLERS **/

    initializeGame({ playing, hostWord, stage }) {
        this.playing = playing;
        this.hostWord = hostWord;
        this.stage = stage;
    }

    onBegin({ stage }) {
        this.playing = true;
        this.stage = stage;
    }

    onHostSubmittedWord({ stage, word = "fake" }) {
        this.hostWord = word;
        this.stage = stage;
    }
    onAllPlayersVoted({ summary }) {
        this.summary = summary;
        this.stage = "summary";
    }

    /** TRIGGER EXTERNAL EVENTS **/

    begin() {
        emit(constants.BEGIN_GAME);
    }
    claimHost() {
        emit(constants.BEGIN_GAME_CLAIMING_HOST);
    }

    submitHostWord() {
        this.hostWordSubmitDisabled = true;
        emit(
            constants.HOST_SUBMITS_WORD,
            this.tmpHostWord,
            action(() => (this.hostWordSubmitDisabled = false))
        );
    }

    /** INTERNAL STATE ACTIONS**/

    typeHostWord(val) {
        this.tmpHostWord = val;
    }

    setStage(stage) {
        this.stage = stage;
    }
}

export default Game;
