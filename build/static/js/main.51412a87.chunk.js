(this.webpackJsonpecho=this.webpackJsonpecho||[]).push([[0],{356:function(e,t,n){},358:function(e,t,n){},359:function(e,t,n){"use strict";n.r(t);var i=n(2),s=n(0),r=n.n(s),c=n(63),o=n.n(c),a=n(12),u=n(47),j=n(11),l=n(208),d=n.n(l),h=document.location,b=h.protocol+"//"+h.hostname+(h.port?":"+h.port:""),O=d()(b,{autoConnect:!1,cors:{origin:"http://".concat(document.domain),methods:["GET","POST"]},query:{userName:window.sessionStorage.getItem("userName")}}),m=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};console.log("EVENT ".concat(e," with data"),t),O.emit(e,t,(function(t){console.log("ACK ".concat(e)),n(t)}))},f=function(e,t){return O.on(e,(function(n){console.log("EXTERNAL EVENT: ".concat(e," with data"),n),t(n)}))},x=n(69),g=n(37),v=n(64),p={CONNECT:"connect",DISCONNECT:"disconnect",REGISTER_PLAYER:"register_user",BEGIN_GAME_CLAIMING_HOST:"begin_game_claiming_host",BEGIN_GAME:"begin_game",HOST_SUBMITS_WORD:"host_submits_word",PLAYER_SUBMITS_DEFN:"player_submits_defn",VOTE:"vote",ON_CONNECT:"on_connect",PLAYER_DISCONNECTS:"user_disconnects",PLAYER_REGISTERED:"user_registered",GAME_BEGUN:"game_begun",HOST_SUBMITTED_WORD:"host_submitted_word",PLAYER_SUBMITTED_DEFN:"player_submitted_defn",ALL_DEFNS_SUBMITTED:"all_defns_submitted",ALL_PLAYERS_VOTED:"all_players_voted",PLAYER_VOTED:"player_voted"},E=function(){function e(t){var n=this;Object(u.a)(this,e),this.store=null,this.users={},this.host=null,this.tmpUserName="",this.registeredUserName="",this.registeringUser=!1,Object(j.l)(this),this.store=t,this.tmpUserName=window.sessionStorage.getItem("userName")||"",f(p.ON_CONNECT,(function(e){return n.initializeExistingUsers(e)})),f(p.PLAYER_REGISTERED,(function(e){return n.addPlayer(e)})),f(p.GAME_BEGUN,(function(e){return n.onGameBegins(e)}))}return Object(v.a)(e,[{key:"userNameRegisterButtonDisabled",get:function(){return this.registeringUser||this.registeredUserName===this.tmpUserName||!this.tmpUserName}},{key:"getPeople",get:function(){return Object.entries(this.users).map((function(e){var t=Object(g.a)(e,2),n=t[0],i=t[1];return Object(x.a)({name:n},i)}))}},{key:"isHost",get:function(){return this.registeredUserName===this.host}},{key:"isRegistered",get:function(){return!!this.registeredUserName}}]),Object(v.a)(e,[{key:"initializeExistingUsers",value:function(e){var t=this,n=e.users,i=void 0===n?[]:n,s=e.host;i.forEach((function(e){return t.users[e.name]=e})),this.host=s}},{key:"addPlayer",value:function(e){var t=e.name,n=e.oldName;delete this.users[n],this.users[t]=e}},{key:"onGameBegins",value:function(e){var t=this,n=e.host,i=e.users;this.host=n,i.forEach((function(e){return t.users[e.name]=e}))}},{key:"registerUserName",value:function(){var e=this;this.registeringUser=!0,m(p.REGISTER_PLAYER,this.tmpUserName,Object(j.f)((function(){e.registeringUser=!1,e.registeredUserName=e.tmpUserName,window.sessionStorage.setItem("userName",e.tmpUserName)})))}},{key:"typeUserName",value:function(e){this.tmpUserName=e}}]),e}(),y=function(){function e(t){var n=this;Object(u.a)(this,e),this.store=null,this.tmpHostWord="",this.hostWord="",this.hostWordSubmitDisabled=!1,this.stage=null,this.summary=[],Object(j.l)(this),this.store=t,f(p.ON_CONNECT,(function(e){return n.initializeGame(e)})),f(p.GAME_BEGUN,(function(e){return n.onBegin(e)})),f(p.HOST_SUBMITTED_WORD,(function(e){return n.onHostSubmittedWord(e)})),f(p.ALL_DEFNS_SUBMITTED,(function(e){return n.setStage("voting")})),f(p.ALL_PLAYERS_VOTED,(function(e){return n.onAllPlayersVoted(e)}))}return Object(v.a)(e,[{key:"initializeGame",value:function(e){var t=e.playing,n=e.hostWord,i=e.stage;this.playing=t,this.hostWord=n,this.stage=i}},{key:"onBegin",value:function(e){var t=e.stage;this.playing=!0,this.stage=t}},{key:"onHostSubmittedWord",value:function(e){var t=e.stage,n=e.word,i=void 0===n?"fake":n;this.hostWord=i,this.stage=t}},{key:"onAllPlayersVoted",value:function(e){var t=e.summary;this.summary=t,this.stage="summary"}},{key:"begin",value:function(){m(p.BEGIN_GAME)}},{key:"claimHost",value:function(){m(p.BEGIN_GAME_CLAIMING_HOST)}},{key:"submitHostWord",value:function(){var e=this;this.hostWordSubmitDisabled=!0,m(p.HOST_SUBMITS_WORD,this.tmpHostWord,Object(j.f)((function(){return e.hostWordSubmitDisabled=!1})))}},{key:"typeHostWord",value:function(e){this.tmpHostWord=e}},{key:"setStage",value:function(e){this.stage=e}}]),e}(),_=n(214),N=n(209),S=n.n(N),C=n(163),w=n.n(C),T=function(){function e(t){var n=this;Object(u.a)(this,e),this.playerSubmissionPercent=0,this.definitions=[],this.hasVoted=!0,Object(j.l)(this),this.store=t,f(p.ON_CONNECT,(function(e){return n.initializeDefinitions(e)})),f(p.PLAYER_SUBMITTED_DEFN,(function(e){return n.onPlayerSubittedDefinition(e)})),f(p.PLAYER_VOTED,(function(e){return n.onPlayerVoted(e)})),f(p.GAME_BEGUN,(function(e){return n.onGameBegun(e)}))}return Object(v.a)(e,[{key:"initializeDefinitions",value:function(e){var t=e.definitions;this.definitions=w()(t)}},{key:"onPlayerSubittedDefinition",value:function(e){var t=e.percent,n=e.definition;this.playerSubmissionPercent=t,this.definitions=w()([].concat(Object(_.a)(this.definitions),[n]))}},{key:"onPlayerVoted",value:function(e){var t=e._id,n=e.votes;S()(this.definitions,{_id:t}).votes=n}},{key:"onGameBegun",value:function(){this.definitions=[]}},{key:"submitDefinition",value:function(e){var t=this;m(p.PLAYER_SUBMITS_DEFN,e,Object(j.f)((function(){"writing"===t.store.game.stage&&(t.store.users.isHost?t.store.game.setStage("voting"):t.store.game.setStage("waiting"))})))}},{key:"vote",value:function(e){var t=this;m(p.VOTE,e,Object(j.f)((function(){return t.hasVoted=!1})))}}]),e}(),I=new function e(){Object(u.a)(this,e),this.users=null,this.game=null,this.definitions=null,Object(j.l)(this),this.users=new E(this),this.game=new y(this),this.definitions=new T(this),console.log("connecting"),O.connect(),O.on("connect",(function(e){return console.log("on connect",e)})),this.users.tmpUserName&&this.users.registerUserName()},U=Object(s.createContext)(),D=n(385),P=function(){return Object(i.jsx)(D.a.Pane,{children:Object(i.jsx)("p",{children:"Waiting for the host to select a word"})})},k=n(381),R=Object(a.a)((function(){var e=Object(s.useContext)(U).definitions;return Object(i.jsxs)(D.a.Pane,{children:[Object(i.jsx)("p",{children:"Waiting for all the players to submit their defintions."}),Object(i.jsx)(k.a,{percent:e.playerSubmissionPercent,indicating:!0})]})})),W=n(380),A=n(382),G=n(45),H=n(379),B=function(e){e._id;var t=e.text,n=void 0===t?"NO TEXT":t,r=e.votes,c=void 0===r?0:r,o=(e.showUser,e.allowVote),a=e.onClick,u=void 0===a?function(){}:a,j=Object(s.useState)(!1),l=Object(g.a)(j,2),d=l[0],h=l[1];return Object(i.jsxs)(W.a.Item,{onMouseEnter:function(){return h(!0)},onMouseLeave:function(){return h(!1)},children:[Object(i.jsx)(W.a.Icon,{style:{width:30},children:Object(i.jsxs)(A.a,{size:"mini",children:[Object(i.jsx)(A.a.Value,{children:c}),Object(i.jsx)(A.a.Label,{children:"Votes"})]})}),Object(i.jsxs)(W.a.Content,{onClick:o?function(){return u()}:function(){},children:[Object(i.jsx)(W.a.Description,{children:n}),Object(i.jsx)(W.a.Header,{as:"a",children:d&&o&&Object(i.jsx)(G.a,{name:"check",color:"green"})})]})]})},L=Object(a.a)((function(e){var t=e.allowVote,n=e.showUser,r=Object(s.useContext)(U).definitions,c=Object(s.useState)(null),o=Object(g.a)(c,2),a=o[0],u=o[1];return Object(i.jsxs)("div",{children:[Object(i.jsx)(W.a,{divided:!0,relaxed:!0,children:r.definitions.map((function(e){var s=e._id;return Object(i.jsx)(B,Object(x.a)({showUser:n,allowVote:t,onClick:function(){return u(e)}},e),s)}))}),Object(i.jsx)(H.a,{header:"Do you want to vote for this Defintion",content:a?a.text:"",open:!!a,onCancel:function(){return u(null)},onConfirm:function(){r.vote(a._id),u(null)}})]})})),M=Object(a.a)((function(){var e=Object(s.useContext)(U).definitions;return Object(i.jsxs)(D.a.Pane,{children:[Object(i.jsx)("p",{children:"Waiting for all the players to submit their definitions."}),Object(i.jsx)(k.a,{percent:e.playerSubmissionPercent,indicating:!0}),Object(i.jsx)(L,{showUser:!0})]})})),V=n(383),Y=n(377),z=n(374),F=n(360),J=Object(a.a)((function(){var e=Object(s.useState)(""),t=Object(g.a)(e,2),n=t[0],r=t[1],c=Object(s.useContext)(U),o=c.game,a=c.definitions;return Object(i.jsxs)(D.a.Pane,{children:[Object(i.jsxs)(V.a,{as:"h2",children:[Object(i.jsx)(G.a,{name:"envelope outline"}),Object(i.jsx)(V.a.Content,{children:o.hostWord})]}),Object(i.jsx)("p",{children:"Enter your definition. Once all the players are done. we'll move onto voting"}),Object(i.jsxs)(Y.a,{children:[Object(i.jsx)(z.a,{placeholder:"Enter your definition",rows:4,onChange:function(e,t){var n=t.value;return r(n)},value:n}),Object(i.jsx)(F.a,{fluid:!0,float:"right",color:"teal",content:"Submit Definition",onClick:function(){return a.submitDefinition(n)}})]})]})})),X=n(373),q=Object(a.a)((function(){var e=Object(s.useContext)(U),t=e.game;return Object(i.jsxs)(D.a.Pane,{children:[Object(i.jsx)("p",{children:"Enter a word. once you are ready hit subit to notify all the players"}),Object(i.jsx)(X.a,{fluid:!0,placeholder:"Enter a word",value:e.hostWord,onChange:function(e,n){var i=n.value;return t.typeHostWord(i)}}),Object(i.jsx)(F.a,{content:"Submit",color:"teal",fluid:!0,onClick:function(){return t.submitHostWord()},disabled:e.hostWordSubmitDisabled})]})})),K=function(){return Object(i.jsxs)(D.a.Pane,{children:[Object(i.jsx)(V.a,{as:"h2",content:"hostWord"}),Object(i.jsx)(L,{allowVote:!0})]})},Q=n(165),Z=Object(a.a)((function(){var e=Object(s.useContext)(U).game;return Object(i.jsxs)(D.a.Pane,{children:[Object(i.jsxs)(Q.a,{children:[Object(i.jsx)("p",{children:"Round is complete!"}),Object(i.jsxs)(V.a,{as:"h2",children:[Object(i.jsx)(G.a,{name:"envelope outline"}),Object(i.jsx)(V.a.Content,{children:e.hostWord})]})]}),Object(i.jsx)(W.a,{divided:!0,relaxed:!0,children:e.summary.map((function(e){var t=e.name,n=e.host,s=e.text,r=e.votedBy,c=e.points;return Object(i.jsxs)(W.a.Item,{children:[Object(i.jsx)(W.a.Icon,{children:Object(i.jsxs)(A.a,{size:"mini",children:[Object(i.jsx)(A.a.Value,{children:c}),Object(i.jsx)(A.a.Label,{children:"Points"})]})}),Object(i.jsxs)(W.a.Content,{children:[Object(i.jsxs)(W.a.Header,{as:"a",children:[Object(i.jsx)(G.a,{name:n?"user secret":"user outline"}),t]}),Object(i.jsx)(W.a.Description,{children:s}),Object(i.jsx)(W.a,{horizontal:!0,children:r.map((function(e,t){return Object(i.jsx)(W.a.Item,{children:Object(i.jsx)(W.a.Header,{as:"a",children:e})},t)}))})]})]},t)}))}),Object(i.jsxs)(Q.a,{children:[Object(i.jsx)("p",{children:"Restart the game"}),Object(i.jsxs)(F.a.Group,{children:[Object(i.jsx)(F.a,{content:"randomize Host",onClick:function(){return e.begin()}}),Object(i.jsx)(F.a,{content:"claim Host",onClick:function(){return e.claimHost()}})]})]})]})})),$=Object(a.a)((function(e){var t=e.panes,n=e.screenMap,r=void 0===n?{}:n,c=Object(s.useContext)(U).game;return Object(i.jsx)("div",{children:Object(i.jsx)(D.a,{menu:{fluid:!0,vertical:!0,icon:"labeled",color:"teal"},panes:t,activeIndex:r[c.stage]})})})),ee=n(212),te=(n(356),function(e){var t=e.icon,n=e.content;return Object(i.jsx)(ee.a.Item,{icon:t,content:Object(i.jsx)("div",{className:"hideOnMobile",children:n})})}),ne=[{menuItem:Object(i.jsx)(te,{icon:"search",content:"Pick a Word"},"s"),render:function(){return Object(i.jsx)(q,{})}},{menuItem:Object(i.jsx)(te,{icon:"edit",content:"Write True Definition"},"w"),render:function(){return Object(i.jsx)(J,{})}},{menuItem:Object(i.jsx)(te,{icon:"eye",content:"Wait for Players to Vote"},"v"),render:function(){return Object(i.jsx)(M,{})}},{menuItem:Object(i.jsx)(te,{icon:"list",content:"Summary"},"sum"),render:function(){return Object(i.jsx)(Z,{})}}],ie={choosing:0,writing:1,voting:2,summary:3},se=function(){return Object(i.jsx)($,{panes:ne,screenMap:ie})},re=[{menuItem:Object(i.jsx)(te,{icon:"clock outline",content:"Wait for Host"},"h"),render:function(){return Object(i.jsx)(P,{})}},{menuItem:Object(i.jsx)(te,{icon:"edit",content:"Write Definition"},"w"),render:function(){return Object(i.jsx)(J,{})}},{menuItem:Object(i.jsx)(te,{icon:"clock",content:"Other Players Writing"},"wait"),render:function(){return Object(i.jsx)(R,{})}},{menuItem:Object(i.jsx)(te,{icon:"clipboard check",content:"Vote"},"v"),render:function(){return Object(i.jsx)(K,{})}},{menuItem:Object(i.jsx)(te,{icon:"list",content:"Summary"},"sum"),render:function(){return Object(i.jsx)(Z,{})}}],ce={choosing:0,writing:1,waiting:2,voting:3,summary:4},oe=function(){return Object(i.jsx)($,{panes:re,screenMap:ce})},ae=Object(a.a)((function(){var e=Object(s.useContext)(U).game;return Object(i.jsx)("div",{children:Object(i.jsxs)(Q.a,{children:[Object(i.jsx)("p",{children:"The game hasn't started yet"}),Object(i.jsx)("p",{children:"Once Everyone has registered hit the button to start"}),Object(i.jsx)(F.a,{fluid:!0,onClick:function(){return e.begin()},content:"Begin"})]})})})),ue=function(){return Object(i.jsx)("div",{children:Object(i.jsx)(Q.a,{children:Object(i.jsx)("p",{children:"Please Register a name to join the game in progress"})})})},je=Object(a.a)((function(){var e=Object(s.useContext)(U),t=e.game,n=e.users;return n.isRegistered?"lobby"===t.stage?Object(i.jsx)(ae,{}):n.isHost?Object(i.jsx)(se,{}):Object(i.jsx)(oe,{}):Object(i.jsx)(ue,{})})),le=n(215),de=n(216),he=function(e){var t=e.name,n=void 0===t?"Anon":t,s=e.host,r=void 0!==s&&s,c=e.points,o=void 0===c?-1:c;return Object(i.jsxs)(W.a.Item,{children:[Object(i.jsx)(W.a.Icon,{name:r?"user secret":"user outline",color:r?"olive":"blue"}),Object(i.jsxs)(W.a.Content,{children:[Object(i.jsx)(W.a.Header,{as:"a",children:n}),Object(i.jsxs)(W.a.Description,{children:[" ",o," points"]})]})]})},be=Object(a.a)((function(){var e=Object(s.useContext)(U).users,t=e.getPeople,n=e.host;return Object(i.jsxs)(Q.a,{children:[Object(i.jsx)(V.a,{children:"People in the room"}),Object(i.jsx)(W.a,{children:t.map((function(e){var t=e.name,s=Object(de.a)(e,["name"]);return Object(i.jsx)(he,Object(x.a)(Object(x.a)({name:t},s),{},{host:t===n}),t)}))})]})})),Oe=n(378),me=n(375),fe=function(){var e=Object(s.useState)(!1),t=Object(g.a)(e,2),n=t[0],c=t[1],o=Object(s.useState)([]),a=Object(g.a)(o,2),u=a[0],j=a[1],l=function(){c(!0),fetch("/word").then((function(e){return e.json()})).then((function(e){var t=e.word,n=e.definition;fetch("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(t)).then((function(e){if(200===e.status)return e.json();throw new Error})).then((function(e){j(e)})).catch((function(){j([{word:t,meanings:[{definitions:[{definition:n}]}]}])})).finally((function(){return c(!1)}))}))};return Object(s.useEffect)((function(){l()}),[]),Object(i.jsxs)(Q.a,{children:[Object(i.jsxs)(Oe.a.Group,{children:[n&&Object(i.jsx)(me.a,{active:!0}),u.map((function(e,t){var n=e.word,s=e.phonetics,c=void 0===s?[]:s,o=e.meanings,a=void 0===o?[]:o;return Object(i.jsx)(Oe.a,{children:Object(i.jsxs)(Oe.a.Content,{children:[Object(i.jsx)(Oe.a.Header,{children:n}),a.map((function(e,t){var n=e.partOfSpeech,s=e.definitions;return(void 0===s?[]:s).map((function(e,s){var c=e.definition,o=e.example;return Object(i.jsxs)(r.a.Fragment,{children:[Object(i.jsxs)(Oe.a.Description,{children:[Object(i.jsx)("i",{children:n})," ",c]}),Object(i.jsx)(Oe.a.Extra,{children:o})]},"".concat(t,"_").concat(s))}))})),c.map((function(e,t){var n=e.text;return Object(i.jsx)(Oe.a.Meta,{children:n},"phonetics_".concat(t))}))]})},t)}))]}),Object(i.jsx)(F.a,{content:"get a random word",onClick:l,disabled:n})]})},xe=Object(a.a)((function(e){var t=e.children,n=Object(s.useContext)(U).users.isHost;return Object(i.jsxs)(le.a,{stackable:!0,columns:2,children:[Object(i.jsx)(le.a.Column,{stretched:!0,width:12,children:t}),Object(i.jsx)(le.a.Column,{width:4,children:Object(i.jsx)(be,{})}),n&&Object(i.jsx)(le.a.Column,{width:16,children:Object(i.jsx)(fe,{})})]})})),ge=n(376),ve=Object(a.a)((function(){var e=Object(s.useContext)(U).users;return e.registeredUserName&&(document.title=e.registeredUserName),Object(i.jsx)(ee.a,{inverted:!0,children:Object(i.jsxs)(ge.a,{children:[e.isRegistered&&Object(i.jsx)(ee.a.Item,{children:Object(i.jsx)(G.a,{size:"big",name:e.isHost?"user secret":"user outline",color:e.isHost?"olive":"blue"})}),Object(i.jsx)(ee.a.Item,{position:"right",children:Object(i.jsx)(X.a,{placeholder:"Enter Your Username",action:{compact:!0,icon:"user add",color:"teal",onClick:function(){return e.registerUserName()},disabled:e.userNameRegisterButtonDisabled,loading:e.registeringUser},disabled:e.registeringUser,onChange:function(t,n){var i=n.value;return e.typeUserName(i)},value:e.tmpUserName})})]})})})),pe=function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)(ve,{}),Object(i.jsx)(ge.a,{children:Object(i.jsx)(xe,{children:Object(i.jsx)(je,{})})})]})},Ee=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,386)).then((function(t){var n=t.getCLS,i=t.getFID,s=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),i(e),s(e),r(e),c(e)}))};n(357),n(358);o.a.render(Object(i.jsx)(U.Provider,{value:I,children:Object(i.jsx)(pe,{})}),document.getElementById("root")),Ee()}},[[359,1,2]]]);
//# sourceMappingURL=main.51412a87.chunk.js.map