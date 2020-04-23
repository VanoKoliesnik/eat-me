import {
	POST_ACCOUNT,
	POST_ACCOUNT_SUCCESS,
	POST_ACCOUNT_FAILURE,
} from "../../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	response: "",
};

export default function ordersReducer(state = initialState, action) {
	switch (action.type) {
		case POST_ACCOUNT:
			return { ...state, loading: true };
		case POST_ACCOUNT_SUCCESS:
			return { response: action.payload, loading: false, hasErrors: false };
		case POST_ACCOUNT_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
