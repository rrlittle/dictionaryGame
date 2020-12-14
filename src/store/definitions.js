import { makeAutoObservable, action } from "mobx";
import { register, emit } from "./socket";
import constants from "./constants";
import find from "lodash/find";

class Definitions {
    store;
    tmpDefinition = "";

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
    }

    /** EXTERNAL EVENT HANDLERS **/
    initializeDefinitions({ definitions }) {
        this.definitions = definitions;
        this.tmpDefinition = "";
    }

    onPlayerSubittedDefinition({ percent, definition }) {
        this.playerSubmissionPercent = percent;
        this.definitions.push(definition);
    }

    onPlayerVoted({ _id, votes }) {
        const votedDef = find(this.definitions, { _id });
        votedDef.votes = votes;
    }

    /** TRIGGER EXTERNAL EVENTS **/

    submitDefinition() {
        emit(
            constants.PLAYER_SUBMITS_DEFN,
            this.tmpDefinition,
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

    /** INTERNAL STATE ACTIONS**/

    typeDefinition(val) {
        this.tmpDefinition = val;
    }
}

export default Definitions;
