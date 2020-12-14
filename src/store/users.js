import { makeAutoObservable, action } from "mobx";
import { register, emit } from "./socket";
import constants from "./constants";

class Users {
    store = null;

    users = {};

    host = null;

    tmpUserName = "";
    registeredUserName = "";
    registeringUser = false; // waiting for registration response

    get userNameRegisterButtonDisabled() {
        return (
            this.registeringUser ||
            this.registeredUserName === this.tmpUserName ||
            !this.tmpUserName
        );
    }
    get getPeople() {
        return Object.entries(this.users).map(([name, obj]) => ({
            name,
            ...obj,
        }));
    }

    get isHost() {
        return this.registeredUserName === this.host;
    }

    get isRegistered() {
        return !!this.registeredUserName;
    }

    constructor(store) {
        makeAutoObservable(this);
        this.store = store;
        this.tmpUserName = window.sessionStorage.getItem("userName") || "";

        register(constants.ON_CONNECT, (data) =>
            this.initializeExistingUsers(data)
        );
        register(constants.PLAYER_REGISTERED, (data) => this.addPlayer(data));
        register(constants.GAME_BEGUN, (data) => this.onGameBegins(data));
    }

    /** EXTERNAL EVENT HANDLERS **/

    initializeExistingUsers({ users = [], host }) {
        users.forEach((u) => (this.users[u.name] = u));
        this.host = host;
    }

    addPlayer(newUser) {
        const { name, oldName } = newUser;
        delete this.users[oldName];
        this.users[name] = newUser;
    }

    onGameBegins({ host, users }) {
        this.host = host;
        users.forEach((u) => (this.users[u.name] = u));
    }

    /** TRIGGER EXTERNAL EVENTS **/

    registerUserName() {
        this.registeringUser = true;
        emit(
            constants.REGISTER_PLAYER,
            this.tmpUserName,
            action(() => {
                this.registeringUser = false;
                this.registeredUserName = this.tmpUserName;
                window.sessionStorage.setItem("userName", this.tmpUserName);
            })
        );
    }

    /** INTERNAL STATE ACTIONS**/

    typeUserName(val) {
        this.tmpUserName = val;
    }
}

export default Users;
