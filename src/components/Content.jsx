import React, { useRef } from "react";
import { Grid, Ref, Sticky } from "semantic-ui-react";
import Room from "./Room";

const Content = ({ children }) => {
	const ref = useRef();
	return (
		<Ref innerRef={ref}>
			<Grid>
				<Grid.Column width={4}>
					<Sticky context={ref} offset={100}>
						<Room />
					</Sticky>
				</Grid.Column>
				<Grid.Column stretched width={12}>
					{children}
				</Grid.Column>
			</Grid>
		</Ref>
	);
};

export default Content;
