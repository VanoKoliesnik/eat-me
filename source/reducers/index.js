import { combineReducers } from "redux";

import categoriesReducer from "./fetchedReducers/categoriesReducer";
import cuisinesReducer from "./fetchedReducers/cuisinesReducer";
import establishmentsCategoriesReducer from "./fetchedReducers/establishmentsCategoriesReducer";

import establishmentsReducer from "./fetchedReducers/establishmentsReducer";
import accountsReducer from "./fetchedReducers/accountsReducer";
import fastCustomersReducer from "./fetchedReducers/fastCustomersReducer";
import dishesReducer from "./fetchedReducers/dishesReducer";
import ordersReduce from "./fetchedReducers/ordersReducer";

import postOrderReducer from "./fetchedReducers/postOrderReducer";

import searchReducer from "./searchReducer";
import orderReducer from "./orderReducer";
import filterCategoriesReducer from "./filterCategoriesReducer";
import filterCuisinesReducer from "./filterCuisinesReducer";

const rootReducer = combineReducers({
	categories: categoriesReducer,
	cuisines: cuisinesReducer,
	establishmentsCategories: establishmentsCategoriesReducer,

	establishments: establishmentsReducer,
	accounts: accountsReducer,
	fastCustomers: fastCustomersReducer,
	dishes: dishesReducer,
	orders: ordersReduce,

	postOrder: postOrderReducer,

	search: searchReducer,
	order: orderReducer,
	filterCategories: filterCategoriesReducer,
	filterCuisines: filterCuisinesReducer,
});

export default rootReducer;
