import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../../store";
import { Tab, Input } from "semantic-ui-react";

const ChooseAWord = observer(() => {
	const store = useContext(Store);
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
				onChange={(e, { value }) => store.setHostWord(value)}
				action={{
					content: "Submit",
					onClick: () => store.submitHostsWord(),
					disabled: store.hostWordSubmitDisabled,
				}}
			/>
		</Tab.Pane>
	);
});

export default ChooseAWord;
