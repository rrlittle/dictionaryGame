import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../store";
import {
    HostScreen,
    PlayerScreen,
    LobbyScreen,
    PleaseRegisterScreen,
} from "./screens";

const GameSpace = observer(() => {
    const store = useContext(Store);
    const game = store.game;
    const users = store.users;
    console.log("rendering GameSpace with", game, users);
    if (!users.isRegistered) return <PleaseRegisterScreen />;
    if (game.stage === "lobby") return <LobbyScreen />;
    if (users.isHost) return <HostScreen />;
    else return <PlayerScreen />;
});

export default GameSpace;
