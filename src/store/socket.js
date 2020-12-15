import io from "socket.io-client";

const loc = document.location;
const url =
    loc.protocol + "//" + loc.hostname + (loc.port ? ":" + loc.port : "");

const socket = io(url, {
    autoConnect: false,
    cors: {
        origin: `http://${document.domain}`,
        methods: ["GET", "POST"],
    },
    query: { userName: window.sessionStorage.getItem("userName") },
});

export const connect = () => {
    console.log("connecting");
    socket.connect();
    socket.on("connect", (data) => console.log("on connect", data));
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
