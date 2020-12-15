import React, { useContext } from "react";
import { Segment, Header, List } from "semantic-ui-react";
import { observer } from "mobx-react";
import Store from "../store";

const Person = ({ name = "Anon", points = -1 }) => (
	<List.Item>
		<List.Header as="a">{name}</List.Header>
		<List.Description> {points} points</List.Description>
	</List.Item>
);

const Room = observer(() => {
	const store = useContext(Store);
	return (
		<Segment fluid>
			<Header>People in the room</Header>
			<List>
				{store.users.getPeople.map(({ name, ...p }) => (
					<Person key={name} name={name} {...p} />
				))}
			</List>
		</Segment>
	);
});

export default Room;
