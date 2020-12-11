import GameSpace from "./GameSpace";
import Content from "./Content";
import Header from "./Header";
import React, { useState } from "react";
import { Container } from "semantic-ui-react";

const App = () => {
	const [host, setHost] = useState(false);
	return (
		<div>
			<Header host={host} toggleHost={setHost} />
			<Container style={{ marginTop: "7em" }}>
				<Content>
					<GameSpace host={host} />
				</Content>
			</Container>
		</div>
	);
};

export default App;
