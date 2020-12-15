import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../store";
import {
	WaitingForHost,
	WriteADefinition,
	WaitingForResults,
	Vote,
	Summary,
} from "./gameTabs";
import TabsScreen from "./TabsScreen";

const panes = [
	{ menuItem: "Wait for Host", render: () => <WaitingForHost /> },
	{ menuItem: "Write Definition", render: () => <WriteADefinition /> },
	{ menuItem: "Other players Writing", render: () => <WaitingForResults /> },
	{ menuItem: "Vote", render: () => <Vote /> },
	{ menuItem: "Summary", render: () => <Summary /> },
];

const screenMap = {
	choosing: 0,
	writing: 1,
	waiting: 2,
	voting: 3,
	summary: 4,
};

const PlayerScreen = observer(() => {
	const store = useContext(Store);
	const users = store.users;
	return <TabsScreen panes={panes} screenMap={screenMap} />;
});

export default PlayerScreen;
