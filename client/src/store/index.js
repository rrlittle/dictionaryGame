import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class Store {
	host = true;
	constructor() {
		makeAutoObservable(this);
	}
	setHost(val) {
		this.host = val;
	}
}

export const store = new Store();
export default createContext();
