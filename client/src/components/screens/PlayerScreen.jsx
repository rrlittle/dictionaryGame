import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../store";
import {
	WaitingForHost,
	WriteADefinition,
	WaitingForResults,
	Vote,
} from "./gameTabs";
import TabsScreen from "./TabsScreen";

const panes = [
	{ menuItem: "Host Chooses a Word", render: () => <WaitingForHost /> },
	{ menuItem: "Write a Definition", render: () => <WriteADefinition /> },
	{ menuItem: "Wait for results", render: () => <WaitingForResults /> },
	{ menuItem: "Vote", render: () => <Vote /> },
];

const screenMap = {
	choosing: 0,
	writing: 1,
	waiting: 2,
	voting: 3,
};

const PlayerScreen = observer(() => {
	const store = useContext(Store);
	const users = store.users;
	return (
		<TabsScreen panes={panes} screenMap={screenMap}>
			<p>You Are a Player!</p>
			<p>
				<strong>{users.host}</strong> is the Host!
			</p>
		</TabsScreen>
	);
});

export default PlayerScreen;
