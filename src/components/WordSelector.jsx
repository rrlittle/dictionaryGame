import React, { useState, useEffect } from "react";
import { Segment, Button, Item, Loader } from "semantic-ui-react";

const WordSelector = () => {
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState([]);
    const fetchWord = () => {
        setLoading(true);
        fetch("/word")
            .then((resp) => resp.json())
            .then(({ word, definition }) => {
                fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                    .then((resp) => {
                        if (resp.status === 200) return resp.json();
                        throw new Error();
                    })
                    .then((defs) => {
                        setRes(defs);
                        setLoading(false);
                    })
                    .catch(() => {
                        setRes([
                            {
                                word,
                                meanings: [{ definitions: [{ definition }] }],
                            },
                        ]);
                    });
            });
    };
    useEffect(() => {
        fetchWord();
    }, []);
    return (
        <Segment>
            <Item.Group>
                {loading && <Loader active></Loader>}
                {res.map(({ word, phonetics = [], meanings = [] }, i) => (
                    <Item key={i}>
                        <Item.Content>
                            <Item.Header>{word}</Item.Header>
                            {meanings.map(
                                ({ partOfSpeech, definitions = [] }, j) =>
                                    definitions.map(
                                        ({ definition, example }) => (
                                            <React.Fragment key={j}>
                                                <Item.Description>
                                                    <i>{partOfSpeech}</i>{" "}
                                                    {definition}
                                                </Item.Description>
                                                <Item.Extra>
                                                    {example}
                                                </Item.Extra>
                                            </React.Fragment>
                                        )
                                    )
                            )}
                            {phonetics.map(({ text }, j) => (
                                <Item.Meta key={j}>{text}</Item.Meta>
                            ))}
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
            <Button content="get a random word" onClick={fetchWord} />
        </Segment>
    );
};

export default WordSelector;
