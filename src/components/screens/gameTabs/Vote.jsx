import React from "react";
import { Tab, Header } from "semantic-ui-react";
import VoteList from "./VoteList";

const Vote = () => (
    <Tab.Pane>
        <Header as="h2" content="hostWord"></Header>
        <VoteList allowVote />
    </Tab.Pane>
);

export default Vote;
