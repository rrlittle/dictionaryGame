import React from "react";
import {
	WaitingForHost,
	WriteADefinition,
	WaitingForResults,
	Vote,
	Summary,
} from "./gameTabs";
import TabsScreen from "./TabsScreen";
import MenuItem from "./MenuItem";

const panes = [
	{
		menuItem: (
			<MenuItem key="h" icon="clock outline" content="Wait for Host" />
		),
		render: () => <WaitingForHost />,
	},
	{
		menuItem: <MenuItem key="w" icon="edit" content="Write Definition" />,
		render: () => <WriteADefinition />,
	},
	{
		menuItem: (
			<MenuItem key="wait" icon="clock" content="Other Players Writing" />
		),
		render: () => <WaitingForResults />,
	},
	{
		menuItem: <MenuItem key="v" icon="clipboard check" content="Vote" />,
		render: () => <Vote />,
	},
	{
		menuItem: <MenuItem key="sum" icon="list" content="Summary" />,
		render: () => <Summary />,
	},
];

const screenMap = {
	choosing: 0,
	writing: 1,
	waiting: 2,
	voting: 3,
	summary: 4,
};

const PlayerScreen = () => <TabsScreen panes={panes} screenMap={screenMap} />;

export default PlayerScreen;
