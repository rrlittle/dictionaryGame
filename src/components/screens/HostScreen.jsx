import React from "react";
import { ChooseAWord, WriteADefinition, WatchVotes, Summary } from "./gameTabs";
import TabsScreen from "./TabsScreen";

const panes = [
    { menuItem: "Choose a word", render: () => <ChooseAWord /> },
    {
        menuItem: "write the true definition",
        render: () => <WriteADefinition />,
    },
    { menuItem: "Watch Votes", render: () => <WatchVotes /> },
    { menuItem: "Summary", render: () => <Summary /> },
];

const screenMap = {
    choosing: 0,
    writing: 1,
    voting: 2,
    summary: 3,
};

const HostScreen = () => (
    <TabsScreen panes={panes} screenMap={screenMap}>
        <p>You are the Host!</p>
    </TabsScreen>
);

export default HostScreen;
