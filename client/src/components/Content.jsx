import React, { useRef } from "react";
import { Grid, Segment, Ref, Sticky, Header } from "semantic-ui-react";

const Content = ({ children }) => {
	const ref = useRef();
	return (
		<Ref innerRef={ref}>
			<Grid>
				<Grid.Column width={4}>
					<Sticky context={ref} offset={100}>
						<Segment>
							<Header>People in the room</Header>
							<div>I'm here</div>
						</Segment>
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
