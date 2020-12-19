import { makeAutoObservable, action } from "mobx";
import { register, emit } from "./socket";
import constants from "./constants";
import find from "lodash/find";
import shuffle from "lodash/shuffle";

class Definitions {
    store;

    playerSubmissionPercent = 0;
    definitions = [];
    hasVoted = true;

    constructor(store) {
        makeAutoObservable(this);
        this.store = store;
        register(constants.ON_CONNECT, (data) =>
            this.initializeDefinitions(data)
        );
        register(constants.PLAYER_SUBMITTED_DEFN, (data) =>
            this.onPlayerSubittedDefinition(data)
        );
        register(constants.PLAYER_VOTED, (data) => this.onPlayerVoted(data));
        register(constants.GAME_BEGUN, (data) => this.onGameBegun(data));
    }

    /** EXTERNAL EVENT HANDLERS **/
    initializeDefinitions({ definitions }) {
        this.definitions = definitions;
        shuffle(this.definitions);
    }

    onPlayerSubittedDefinition({ percent, definition }) {
        this.playerSubmissionPercent = percent;
        this.definitions.push(definition);
        shuffle(this.definitions);
    }

    onPlayerVoted({ _id, votes }) {
        const votedDef = find(this.definitions, { _id });
        votedDef.votes = votes;
    }

    onGameBegun() {
        this.definitions = [];
    }
    /** TRIGGER EXTERNAL EVENTS **/

    submitDefinition(defn) {
        emit(
            constants.PLAYER_SUBMITS_DEFN,
            defn,
            action(() => {
                if (this.store.game.stage === "writing") {
                    if (this.store.users.isHost)
                        this.store.game.setStage("voting");
                    else this.store.game.setStage("waiting");
                }
            })
        );
    }

    vote(_id) {
        emit(
            constants.VOTE,
            _id,
            action(() => (this.hasVoted = false))
        );
    }
}

export default Definitions;
