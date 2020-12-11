import React from "react";
import { Menu, Container, Button, Checkbox } from "semantic-ui-react";

const Header = ({ toggleHost, host }) => (
	<Menu fixed="top" inverted>
		<Container>
			<Menu.Item>Project Name</Menu.Item>
			<Menu.Item>Home</Menu.Item>
			<Menu.Item>etc</Menu.Item>
			<Menu.Item>
				<Checkbox
					toggle
					label={"toggle host"}
					checked={host}
					onChange={() => toggleHost(!host)}
				/>
			</Menu.Item>
			<Menu.Item position="right">
				user name input
				<Button>Set Username</Button>
			</Menu.Item>
		</Container>
	</Menu>
);

export default Header;
