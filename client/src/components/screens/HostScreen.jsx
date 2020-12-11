import React from "react";
import { Segment, Tab } from "semantic-ui-react";
import { ChooseAWord, WriteADefinition, WatchVotes } from "./gameTabs";

const panes = [
	{ menuItem: "Choose a word", render: ChooseAWord },
	{ menuItem: "write the true definition", render: WriteADefinition },
	{ menuItem: "Watch Votes", render: WatchVotes },
];

const HostScreen = ({ activeIndex = 0 }) => (
	<div>
		<Segment>
			<p>You are the Host!</p>
		</Segment>
		<Tab panes={panes} activeIndex={activeIndex}></Tab>
	</div>
);

export default HostScreen;
