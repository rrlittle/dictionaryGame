import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../store";
import { Segment, Tab } from "semantic-ui-react";
import { ChooseAWord, WriteADefinition, WatchVotes } from "./gameTabs";

const HostScreen = observer(() => {
	const panes = [
		{ menuItem: "Choose a word", render: () => <ChooseAWord /> },
		{
			menuItem: "write the true definition",
			render: () => <WriteADefinition />,
		},
		{ menuItem: "Watch Votes", render: () => <WatchVotes /> },
	];

	const store = useContext(Store);
	return (
		<div>
			<Segment>
				<p>You are the Host!</p>
			</Segment>
			<Tab panes={panes} activeIndex={store.activeIndex}></Tab>
		</div>
	);
});

export default HostScreen;
