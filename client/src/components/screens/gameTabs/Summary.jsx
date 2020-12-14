import React, { useContext } from "react";
import { observer } from "mobx-react";
import Store from "../../../store";
import {
    Tab,
    Segment,
    List,
    Header,
    Icon,
    Statistic,
    Button,
} from "semantic-ui-react";

const Summary = observer(() => {
    const store = useContext(Store);
    const game = store.game;
    return (
        <Tab.Pane>
            <Segment>
                <p>Round is complete!</p>
                <Header as="h2">
                    <Icon name="envelope outline" />
                    <Header.Content>{game.hostWord}</Header.Content>
                </Header>
            </Segment>
            <List divided relaxed>
                {game.summary.map(({ name, host, text, votedBy, points }) => (
                    <List.Item key={name}>
                        <List.Icon>
                            <Statistic size="mini">
                                <Statistic.Value>{points}</Statistic.Value>
                                <Statistic.Label>Points</Statistic.Label>
                            </Statistic>
                        </List.Icon>
                        <List.Content>
                            <List.Header as="a">
                                <Icon
                                    name={host ? "user secret" : "user outline"}
                                />
                                {name}
                            </List.Header>
                            <List.Description>{text}</List.Description>
                            <List horizontal>
                                {votedBy.map((name, i) => (
                                    <List.Item key={i}>
                                        <List.Header as="a">{name}</List.Header>
                                    </List.Item>
                                ))}
                            </List>
                        </List.Content>
                    </List.Item>
                ))}
            </List>

            <Segment>
                <p>Restart the game</p>
                <Button.Group>
                    <Button
                        content="randomize Host"
                        onClick={() => game.begin()}
                    />
                    <Button
                        content="claim Host"
                        onClick={() => game.claimHost()}
                    />
                </Button.Group>
            </Segment>
        </Tab.Pane>
    );
});

export default Summary;
