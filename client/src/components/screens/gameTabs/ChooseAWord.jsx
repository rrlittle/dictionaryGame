import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../../store";
import { Tab, Input } from "semantic-ui-react";

const ChooseAWord = observer(() => {
	const store = useContext(Store);
	const game = store.game;

	return (
		<Tab.Pane>
			<p>
				Enter a word. once you are ready hit subit to notify all the
				players
			</p>
			<Input
				fluid
				placeholder="Enter a word"
				value={store.hostWord}
				onChange={(e, { value }) => game.typeHostWord(value)}
				action={{
					content: "Submit",
					onClick: () => game.submitHostWord(),
					disabled: store.hostWordSubmitDisabled,
				}}
			/>
		</Tab.Pane>
	);
});

export default ChooseAWord;
