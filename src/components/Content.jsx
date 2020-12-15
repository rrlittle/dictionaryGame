import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react";
import Store from "../store";
import Room from "./Room";

const Content = observer(({ children }) => {
	const store = useContext(Store);
	const isHost = store.users.isHost;
	return (
		<Grid stackable columns={2}>
			<Grid.Column stretched width={12}>
				{children}
			</Grid.Column>
			<Grid.Column width={4}>
				<Room />
			</Grid.Column>
		</Grid>
	);
});

export default Content;
