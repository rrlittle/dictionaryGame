import io from "socket.io-client";

const socket = io(`http://${document.domain}:${5000}`, {
    autoConnect: false,
    cors: {
        origin: `http://${document.domain}`,
        methods: ["GET", "POST"],
    },
});

export const connect = () => {
    console.log("connecting");
    socket.connect();
};

export const emit = (event, data, ack = () => {}) => {
    console.log(`EVENT ${event} with data`, data);
    socket.emit(event, data, (args) => {
        console.log(`ACK ${event}`);
        ack(args);
    });
};

export const register = (event, handler) =>
    socket.on(event, (data) => {
        console.log(`EXTERNAL EVENT: ${event} with data`, data);
        handler(data);
    });
