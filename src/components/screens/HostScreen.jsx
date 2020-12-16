import React from "react";
import { ChooseAWord, WriteADefinition, WatchVotes, Summary } from "./gameTabs";
import TabsScreen from "./TabsScreen";
import MenuItem from "./MenuItem";

const panes = [
    {
        menuItem: <MenuItem icon="search" content="Pick a Word" key="s" />,
        render: () => <ChooseAWord />,
    },
    {
        menuItem: (
            <MenuItem icon="edit" content="Write True Definition" key="w" />
        ),
        render: () => <WriteADefinition />,
    },
    {
        menuItem: (
            <MenuItem icon="eye" content="Wait for Players to Vote" key="v" />
        ),
        render: () => <WatchVotes />,
    },
    {
        menuItem: <MenuItem icon="list" content="Summary" key="sum" />,
        render: () => <Summary />,
    },
];

const screenMap = {
    choosing: 0,
    writing: 1,
    voting: 2,
    summary: 3,
};

const HostScreen = () => <TabsScreen panes={panes} screenMap={screenMap} />;

export default HostScreen;
