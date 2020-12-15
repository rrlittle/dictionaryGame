import React, { useContext } from "react";
import { Segment, Header, List } from "semantic-ui-react";
import { observer } from "mobx-react";
import Store from "../store";

const Person = ({ name = "Anon", host = false, points = -1 }) => (
	<List.Item>
		<List.Icon
			name={host ? "user secret" : "user outline"}
			color={host ? "olive" : "blue"}
		></List.Icon>
		<List.Content>
			<List.Header as="a">{name}</List.Header>
			<List.Description> {points} points</List.Description>
		</List.Content>
	</List.Item>
);

const Room = observer(() => {
	const store = useContext(Store);
	const users = store.users;
	const people = users.getPeople;
	const host = users.host;
	return (
		<Segment>
			<Header>People in the room</Header>
			<List>
				{people.map(({ name, ...p }) => (
					<Person
						key={name}
						name={name}
						{...p}
						host={name === host}
					/>
				))}
			</List>
		</Segment>
	);
});

export default Room;
