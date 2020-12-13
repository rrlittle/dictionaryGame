const constants = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",

    // client -> server
    REGISTER_PLAYER: "register_user", // 'name'
    BEGIN_GAME: "begin_game", // None
    HOST_SUBMITS_WORD: "host_submits_word", // 'word'
    PLAYER_SUBMITS_DEFN: "player_submits_defn", // 'definition'
    VOTE: "vote", // 'DefnId'

    // server -> client
    ON_CONNECT: "on_connect",
    PLAYER_DISCONNECTS: "user_disconnects",
    PLAYER_REGISTERED: "user_registered",
    GAME_BEGUN: "game_begun",
    HOST_SUBMITTED_WORD: "host_submitted_word",
    PLAYER_SUBMITTED_DEFN: "player_submitted_defn",
    ALL_DEFNS_SUBMITTED: "all_defns_submitted",
    ALL_PLAYERS_VOTED: "all_players_voted",
    PLAYER_VOTED: "player_voted",
};
export default constants;
