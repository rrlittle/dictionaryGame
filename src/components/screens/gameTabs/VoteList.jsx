import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import Store from "../../../store";
import { List, Confirm, Statistic, Icon } from "semantic-ui-react";

const Vote = ({
	_id,
	user = "ANON",
	text = "NO TEXT",
	votes = 0,
	showUser,
	allowVote,
	onClick = () => {},
}) => {
	const [hovering, setHovering] = useState(false);
	return (
		<List.Item
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<List.Icon style={{ width: 30 }}>
				<Statistic size="mini">
					<Statistic.Value>{votes}</Statistic.Value>
					<Statistic.Label>Votes</Statistic.Label>
				</Statistic>
			</List.Icon>
			<List.Content onClick={allowVote ? () => onClick() : () => {}}>
				<List.Description>{text}</List.Description>
				<List.Header as="a">
					{showUser && user}
					{hovering && allowVote && (
						<Icon name="check" color="green" />
					)}
				</List.Header>
			</List.Content>
		</List.Item>
	);
};

const VoteList = observer(({ allowVote, showUser }) => {
	const store = useContext(Store);
	const defs = store.definitions;
	const [toVote, setToVote] = useState(null);
	return (
		<div>
			<List divided relaxed>
				{defs.definitions.map((def) => {
					const { _id } = def;
					return (
						<Vote
							showUser={showUser}
							allowVote={allowVote}
							onClick={() => setToVote(def)}
							key={_id}
							{...def}
						/>
					);
				})}
			</List>
			<Confirm
				header="Do you want to vote for this Defintion"
				content={!!toVote ? toVote.text : ""}
				open={!!toVote}
				onCancel={() => setToVote(null)}
				onConfirm={() => {
					defs.vote(toVote._id);
					setToVote(null);
				}}
			/>
		</div>
	);
});

export default VoteList;
