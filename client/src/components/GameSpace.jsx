import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../store";
import { HostScreen, PlayerScreen } from "./screens";

const GameSpace = observer(() => {
	const store = useContext(Store);
	return store.host ? <HostScreen /> : <PlayerScreen />;
});

export default GameSpace;
