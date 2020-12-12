import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import Store from "../../../store";
import { List, Confirm, Statistic, Icon } from "semantic-ui-react";

const Vote = ({ user, definition, showUser, allowVote, votes, onVote }) => {
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
			<List.Content
				onClick={
					allowVote ? () => onVote({ definition, user }) : () => {}
				}
			>
				<List.Description>{definition}</List.Description>
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
	const [toVote, setToVote] = useState(null);
	return (
		<div>
			<List divided relaxed>
				{store.submissions.map(({ user, ...others }) => (
					<Vote
						showUser={showUser}
						allowVote={allowVote}
						onVote={setToVote}
						key={user}
						user={user}
						{...others}
					/>
				))}
			</List>
			<Confirm
				header="Do you want to vote for this Defintion"
				content={!!toVote ? toVote.definition : ""}
				open={!!toVote}
				onCancel={() => setToVote(null)}
				onConfirm={() => store.vote(toVote)}
			/>
		</div>
	);
});

export default VoteList;
