import {
	ORDER_DISHES,
	ORDER_QUANTITY,
	ORDER_TOTAL_PRICE,
	SET_ORDER_DISHES,
	SET_ORDER_QUANTITY,
	SET_ORDER_TOTAL_PRICE,
} from "../utilities/constants";

const initialState = {
	dishes:
		JSON.parse(localStorage.getItem(ORDER_DISHES)) === null
			? []
			: JSON.parse(localStorage.getItem(ORDER_DISHES)),
	quantity:
		JSON.parse(localStorage.getItem(ORDER_QUANTITY)) === null
			? 0
			: JSON.parse(localStorage.getItem(ORDER_QUANTITY)),
	totalPrice:
		JSON.parse(localStorage.getItem(ORDER_TOTAL_PRICE)) === null
			? 0
			: JSON.parse(localStorage.getItem(ORDER_TOTAL_PRICE)),
};

export default function setOrderData(state = initialState, action) {
	switch (action.type) {
		case SET_ORDER_DISHES:
			return { ...state, dishes: action.payload };
		case SET_ORDER_QUANTITY:
			return { ...state, quantity: action.payload };
		case SET_ORDER_TOTAL_PRICE:
			return { ...state, totalPrice: action.payload };
		default:
			return state;
	}
}
