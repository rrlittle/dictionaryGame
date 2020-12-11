import React from "react";
import { HostScreen, PlayerScreen } from "./screens";

const GameSpace = ({ host }) => (host ? <HostScreen /> : <PlayerScreen />);

export default GameSpace;
