import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../store";
import { Segment, Tab } from "semantic-ui-react";
import {
	WaitingForHost,
	WriteADefinition,
	WaitingForResults,
	Vote,
} from "./gameTabs";

const panes = [
	{ menuItem: "Host Chooses a Word", render: () => <WaitingForHost /> },
	{ menuItem: "Write a Definition", render: () => <WriteADefinition /> },
	{ menuItem: "Wait for results", render: () => <WaitingForResults /> },
	{ menuItem: "Vote", render: Vote },
];

const PlayerScreen = observer(() => {
	const store = useContext(Store);
	return (
		<div>
			<Segment>
				<p>You Are a Player!</p>
				<p>Player X is the Host!</p>
			</Segment>
			<Tab panes={panes} activeIndex={store.activeIndex} />
		</div>
	);
});

export default PlayerScreen;
