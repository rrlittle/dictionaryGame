import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Menu, Container, Input, Icon } from "semantic-ui-react";
import Store from "../store";

const Header = observer(() => {
	const store = useContext(Store);
	const users = store.users;
	return (
		<Menu inverted>
			<Container>
				{users.isRegistered && (
					<Menu.Item>
						<Icon
							size="big"
							name={users.isHost ? "user secret" : "user outline"}
							color={users.isHost ? "olive" : "blue"}
						/>
					</Menu.Item>
				)}
				<Menu.Item position="right">
					<Input
						placeholder="Enter Your Username"
						action={{
							compact: true,
							icon: "user add",
							color: "teal",
							onClick: () => users.registerUserName(),
							disabled: users.userNameRegisterButtonDisabled,
							loading: users.registeringUser,
						}}
						disabled={users.registeringUser}
						onChange={(e, { value }) => users.typeUserName(value)}
						value={users.tmpUserName}
					/>
				</Menu.Item>
			</Container>
		</Menu>
	);
});

export default Header;
