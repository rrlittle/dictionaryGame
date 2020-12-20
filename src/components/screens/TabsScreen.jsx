import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../store";
import { Tab, Header } from "semantic-ui-react";

const TabsScreen = observer(({ panes, screenMap = {} }) => {
    const store = useContext(Store);
    const game = store.game;
    return (
        <div>
            <Tab
                menu={{
                    fluid: true,
                    vertical: true,
                    icon: "labeled",
                    color: "teal",
                }}
                panes={panes}
                activeIndex={screenMap[game.stage]}
            />
        </div>
    );
});

export default TabsScreen;
