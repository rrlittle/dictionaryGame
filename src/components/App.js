import GameSpace from "./GameSpace";
import Content from "./Content";
import Header from "./Header";
import React from "react";
import { Container } from "semantic-ui-react";

const App = () => (
    <div>
        <Header />
        <Container>
            <Content>
                <GameSpace />
            </Content>
        </Container>
    </div>
);

export default App;
