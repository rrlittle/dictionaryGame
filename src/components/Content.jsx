import React, { useRef } from "react";
import { Grid, Ref, Sticky } from "semantic-ui-react";
import Room from "./Room";

const Content = ({ children }) => {
	const ref = useRef();
	return (
		<Ref>
			<Grid stackable reversed="mobile" columns={2}>
				<Grid.Column width={4}>
					<Room />
				</Grid.Column>
				<Grid.Column stretched width={12}>
					{children}
				</Grid.Column>
			</Grid>
		</Ref>
	);
};

export default Content;
