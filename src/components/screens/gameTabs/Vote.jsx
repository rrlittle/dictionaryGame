import React from "react";
import { Tab } from "semantic-ui-react";
import VoteList from "./VoteList";

const Vote = () => (
	<Tab.Pane>
		<VoteList allowVote />
	</Tab.Pane>
);

export default Vote;
