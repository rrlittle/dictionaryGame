import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Menu, Container, Input } from "semantic-ui-react";
import Store from "../store";

const Header = observer(() => {
	const store = useContext(Store);
	const users = store.users;
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item position="right">
					<Input
						placeholder="Enter Your Username"
						action={{
							content: "Register",
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
