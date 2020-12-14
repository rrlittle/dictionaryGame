import io from "socket.io-client";

const socket = io(`http://${document.domain}:${5000}`, {
	autoConnect: false,
	cors: {
		origin: `http://${document.domain}`,
		methods: ["GET", "POST"],
	},
});

export const connect = () => {
	console.log("attempt to connect");
	socket.connect();
};

// *****************
//internal actions
// *****************

export const registerUser = (name, currentName, ack) => {
	// you have chosen a name
	const json = { name, currentName };
	console.log("registerUser", json);
	socket.emit("registerUser", json, () => {
		console.log("registerUser ack");
		ack();
	});
};

// you are the host and have chosen a word
export const submitWord = (word) => {
	console.log("submitting the hosts word");
	socket.emit("submitWord", word, () => console.log("submitWord ack"));
};

// you have written your definition
export const submitDefinition = (definition, ack) => {
	console.log("submitting this players definition", definition);
	socket.emit("submitDefinition", definition, () => {
		console.log("submitDefinition ack");
		ack();
	});
};

// you have voted for a defintion
export const vote = () => {};

// *****************
// external event handling
// *****************

export const onConnect = (store) =>
	socket.on("onConnect", (gameState) => {
		console.log("onConnect", gameState);
		store.initialize(gameState);
	});

// when any player registers
export const onUserRegister = (store) =>
	socket.on("userRegistered", ({ newPlayer, oldName }) => {
		console.log("userRegistered", newPlayer);
		store.onUserRegister(newPlayer, oldName);
	});

// when a new round is starting
export const onRoundBegins = () => {};

// when the host submits the word for the round
export const onSubmitWord = (store) => {
	socket.on("wordSubmitted", (word) => {
		console.log("host has submitted a word", word);
		store.onHostSubmitedWord(word);
	});
};

// when any player has submitted a definition
export const onPlayerSubmitsDefinition = (store) => {
	socket.on("defintionSubmitted", ({ votes, user, definition }) => {
		console.log("player has submitted a defintion", {
			votes,
			user,
			definition,
		});
		store.onPlayerSubmitsDefn({ votes, user, definition });
	});
};
export const onWritingDefinitionsDone = (store, ack) => {
	socket.on("onWritingDefinitionsDone", () => {
		console.log("all players have written their definitions");
		store.onWritingDefinitionsDone();
	});
};
// when any player has voted
export const onPlayerVotes = () => {};

// when voting has ended
export const onAllPlayersVoted = () => {};
