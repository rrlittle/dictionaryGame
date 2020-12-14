import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { default as StoreContext, store } from "./store";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.css";

ReactDOM.render(
	<StoreContext.Provider value={store}>
		<App />
	</StoreContext.Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
