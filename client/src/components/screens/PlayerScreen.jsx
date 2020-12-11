import React from "react";
import { Segment, Tab } from "semantic-ui-react";
import {
	WaitingForHost,
	WriteADefinition,
	WaitingForResults,
	WatchVotes,
	Vote,
} from "./gameTabs";

const panes = [
	{ menuItem: "Host Chooses a Word", render: WaitingForHost },
	{ menuItem: "Write a Definition", render: WriteADefinition },
	{ menuItem: "Wait for results", render: WaitingForResults },
	{ menuItem: "Vote", render: Vote },
];

const PlayerScreen = ({ activeStep = 0 }) => (
	<div>
		<Segment>
			<p>You Are a Player!</p>
			<p>Player X is the Host!</p>
		</Segment>
		<Tab panes={panes} activeIndex={activeStep} />
	</div>
);

export default PlayerScreen;
