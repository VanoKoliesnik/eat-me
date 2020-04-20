import { SET_ORDER_QUANTITY } from "../utilities/constants";

const initialState = {
	quantity: null,
};

export default function setOrderData(state = initialState, action) {
	switch (action.type) {
		case SET_ORDER_QUANTITY:
			return { ...state, quantity: action.payload };
		default:
			return state;
	}
}
