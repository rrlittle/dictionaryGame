import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../store";
import { Segment, Button } from "semantic-ui-react";

const LobbyScreen = observer(() => {
    const store = useContext(Store);
    const game = store.game;
    return (
        <div>
            <Segment>
                <p>The game hasn't started yet</p>
                <p>Once Everyone has registered hit the button to start</p>
                <Button fluid onClick={() => game.begin()} content="Begin" />
            </Segment>
        </div>
    );
});

export default LobbyScreen;
