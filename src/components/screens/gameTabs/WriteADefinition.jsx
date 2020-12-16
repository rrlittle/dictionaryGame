import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import Store from "../../../store";

import { Tab, Form, TextArea, Button, Header, Icon } from "semantic-ui-react";

const WriteADefinition = observer(() => {
	const [def, setDef] = useState("");
	const store = useContext(Store);
	const game = store.game;
	const defs = store.definitions;
	return (
		<Tab.Pane>
			<Header as="h2">
				<Icon name="envelope outline" />
				<Header.Content>{game.hostWord}</Header.Content>
			</Header>
			<p>
				Enter your definition. Once all the players are done. we'll move
				onto voting
			</p>
			<Form>
				<TextArea
					placeholder="Enter your definition"
					rows={4}
					onChange={(e, { value }) => setDef(value)}
					value={def}
				/>
				<Button
					fluid
					float="right"
					color="teal"
					content="Submit Definition"
					onClick={() => defs.submitDefinition(def)}
				/>
			</Form>
		</Tab.Pane>
	);
});

export default WriteADefinition;
