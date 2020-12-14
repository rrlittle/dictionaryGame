import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../../store";
import { Tab, Progress } from "semantic-ui-react";
import VoteList from "./VoteList";

const WatchVotes = observer(() => {
    const store = useContext(Store);
    const defs = store.definitions;
    return (
        <Tab.Pane>
            <p>Waiting for all the players to submit their definitions.</p>
            <Progress percent={defs.playerSubmissionPercent} indicating />
            <VoteList showUser />
        </Tab.Pane>
    );
});

export default WatchVotes;
