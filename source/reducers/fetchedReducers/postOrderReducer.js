import { POST_ORDER, POST_ORDER_SUCCESS, POST_ORDER_FAILURE } from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	response: "",
};

export default function ordersReducer(state = initialState, action) {
	switch (action.type) {
		case POST_ORDER:
			return { ...state, loading: true };
		case POST_ORDER_SUCCESS:
			return { response: action.payload, loading: false, hasErrors: false };
		case POST_ORDER_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
