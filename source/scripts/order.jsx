import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import Order from "../pages/Order";
import rootReducer from "../reducers";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render(
	<Provider store={store}>
		<Order />
	</Provider>,
	document.getElementById("app")
);
