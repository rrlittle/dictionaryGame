import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../../store";
import { Tab, Progress } from "semantic-ui-react";

const WaitForResults = observer(() => {
    const store = useContext(Store);
    const def = store.definitions;
    return (
        <Tab.Pane>
            <p>Waiting for all the players to submit their defintions.</p>
            <Progress percent={def.playerSubmissionPercent} indicating />
        </Tab.Pane>
    );
});

export default WaitForResults;
