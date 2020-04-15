import {
	GET_CATEGORIES,
	GET_CATEGORIES_SUCCESS,
	GET_CATEGORIES_FAILURE,
} from "../utilities/constants";

const initialState = {
	loading: false,
	hasErrors: false,
	categories: [],
};

export default function categoriesReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CATEGORIES:
			return { ...state, loading: true };
		case GET_CATEGORIES_SUCCESS:
			return { categories: action.payload, loading: false, hasErrors: false };
		case GET_CATEGORIES_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		default:
			return state;
	}
}
