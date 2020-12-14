import { makeAutoObservable, action } from "mobx";
import { createContext } from "react";
import {
	onUserRegister,
	registerUser,
	onConnect,
	connect,
	submitWord,
	onSubmitWord,
	submitDefinition,
	onPlayerSubmitsDefinition,
	onWritingDefinitionsDone,
} from "./api";

class Store {
	/** DISPLAY ATTRIBUTES **/
	host = false;
	activeIndex = 0;
	username = "";
	registeredUserName = "";
	registeringUser = false;
	hostWord = "";
	definition = "";
	playerSubmissionPercent = 35;
	submissions = [
		{ votes: 1, user: "RL", definition: "what what!" },
		{ votes: 2, user: "RL1", definition: "what what!" },
		{ votes: 3, user: "RL2", definition: "what what!" },
		{ votes: 4, user: "RL3", definition: "what what!" },
	];
	people = {};

	get userNameRegisterButtonDisabled() {
		return (
			this.registeringUser ||
			this.registeredUserName === this.username ||
			!this.username
		);
	}
	get hostWordSubmitDisabled() {
		return !this.hostWord;
	}

	get getPeople() {
		return Object.entries(this.people)
			.map(([name, obj]) => ({ name, ...obj }))
			.sort((a, b) => a.order - b.order);
	}

	constructor() {
		makeAutoObservable(this);
		// listen to external events
		onConnect(this); // when we connect
		onUserRegister(this); // when another user registers
		onSubmitWord(this); // when the host submits a word
		onPlayerSubmitsDefinition(this);
		onWritingDefinitionsDone(this);
		// after listeners have been registered
		connect();
	}

	/**
	DEV TOOLS
	**/
	step() {
		this.activeIndex += 1;
	}
	backstep() {
		this.activeIndex -= 1;
	}

	setHost(val) {
		this.host = val;
	}
	/**
	DEV TOOLS
	**/

	/** EVENT LISTENERS **/

	initialize({ players, host }) {
		this.people = players;
		this.host = host === this.registeredUserName;
	}

	onUserRegister(newUser, oldUserName) {
		delete this.people[oldUserName];
		this.people[newUser.name] = newUser;
	}

	onHostSubmitedWord(word) {
		this.hostWord = word;
		this.activeIndex += 1;
	}
	onPlayerSubmitsDefn(defn) {
		this.submissions.push(defn);
	}
	onWritingDefinitionsDone() {
		if (!this.host) {
			console.log("waiting for defintions is done. moving to next page");
			this.activeIndex += 1;
		}
	}

	/** CLIENT ACTIONS **/

	registerUserName() {
		// when we register a username
		this.registeringUser = true;
		registerUser(
			this.username,
			this.registeredUserName,
			action(() => {
				console.log("we have registered our username");
				// after server responds
				this.registeredUserName = this.username;
				this.registeringUser = false;
			})
		);
	}

	submitHostsWord() {
		//move to the write a definition screen
		submitWord(this.hostWord);
	}

	submitDefinition() {
		submitDefinition(
			this.definition,
			action(() => {
				this.activeIndex += 1;
			})
		);
		// moves to the vote screen
	}

	/** LOCAL STATE ACTIONS **/

	setUserName(val) {
		this.username = val;
	}
	setHostWord(val) {
		this.hostWord = val;
	}
	setDefinition(val) {
		this.definition = val;
	}
}

export const store = new Store();
export default createContext();
