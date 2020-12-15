import React, { useState, useEffect } from "react";
import { Segment, Header, Button, Item } from "semantic-ui-react";

const WordSelector = () => {
    const [res, setRes] = useState({});
    const fetchWord = () =>
        fetch("/word")
            .then((resp) => resp.json())
            .then(setRes);
    useEffect(() => {
        fetchWord();
    }, []);
    console.log("fetchWord", res);
    const word = res.word;
    const def = res.definition;
    return (
        <Segment>
            <Header content="Random Word" />
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Item.Header as="a">{word}</Item.Header>
                        <Item.Description>{def}</Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
            <Button content="get a random word" onClick={fetchWord} />
        </Segment>
    );
};

export default WordSelector;
