import { combineReducers } from "redux";

import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
	// accounts: accountsReducer,
	// fastCustomers: fastCustomersReducer,
	categories: categoriesReducer,
	// cuisines: cuisinesReducer,
	// establishments: establishmentsReducer,
	// dishes: dishesReducer,
	// orders: ordersReducer
});

export default rootReducer;
