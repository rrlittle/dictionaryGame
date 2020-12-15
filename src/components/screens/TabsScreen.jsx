import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../store";
import { Segment, Tab } from "semantic-ui-react";

const TabsScreen = observer(({ panes, screenMap = {} }) => {
    const store = useContext(Store);
    const game = store.game;
    return (
        <div>
            <Tab
                menu={{ fluid: true, vertical: true }}
                panes={panes}
                activeIndex={screenMap[game.stage]}
            />
        </div>
    );
});

export default TabsScreen;
