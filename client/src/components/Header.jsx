import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Menu, Container, Button, Checkbox } from "semantic-ui-react";
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
				<Menu.Item position="right">
					user name input
					<Button>Set Username</Button>
				</Menu.Item>
			</Container>
		</Menu>
	);
});

export default Header;
