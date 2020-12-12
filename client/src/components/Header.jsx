import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Menu, Container, Checkbox, Input, Button } from "semantic-ui-react";
import Store from "../store";

const Header = observer(() => {
	const store = useContext(Store);
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item>
					<Checkbox
						toggle
						label={"toggle host"}
						checked={store.host}
						onChange={() => store.setHost(!store.host)}
					/>
				</Menu.Item>
				<Menu.Item>
					<Button
						content="prev step"
						onClick={() => store.backstep()}
					/>
				</Menu.Item>
				<Menu.Item>
					<Button content="next step" onClick={() => store.step()} />
				</Menu.Item>
				<Menu.Item position="right">
					<Input
						placeholder="Enter Your Username"
						action={{
							content: "Register",
							onClick: () => store.registerUserName(),
							disabled: store.userNameRegisterButtonDisabled,
							loading: store.registeringUser,
						}}
						onChange={(e, { value }) => store.setUserName(value)}
						value={store.username}
					/>
				</Menu.Item>
			</Container>
		</Menu>
	);
});

export default Header;
