import React, { useContext } from "react";
import { observer } from "mobx-react";
import { HostScreen, PlayerScreen } from "./screens";
import Store from "../store";

const GameSpace = observer(() => {
	const store = useContext(Store);
	return store.host ? <HostScreen /> : <PlayerScreen />;
});

export default GameSpace;
