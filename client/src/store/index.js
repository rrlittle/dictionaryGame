import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { connect } from "./socket";
import Users from "./users";
import Game from "./game";
import Definitions from "./definitions";

class Store {
    users = null;
    game = null;
    definitions = null;
    constructor() {
        makeAutoObservable(this);
        this.users = new Users(this);
        this.game = new Game(this);
        this.definitions = new Definitions(this);

        // after all listeners in substores have been initialized
        connect();
        if (this.users.tmpUserName) this.users.registerUserName();
    }
}

export const store = new Store();
export default createContext();
