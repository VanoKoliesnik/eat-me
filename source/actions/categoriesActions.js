import {
	API_URL,
	GET_CATEGORIES,
	GET_CATEGORIES_SUCCESS,
	GET_CATEGORIES_FAILURE,
} from "../utilities/constants";

const getCategories = () => ({ type: GET_CATEGORIES });
const getCategoriesSuccess = (categories) => ({
	type: GET_CATEGORIES_SUCCESS,
	payload: categories,
});
const getCategoriesFailure = () => ({ type: GET_CATEGORIES_FAILURE });

export function fetchCategories() {
	return async (dispatch) => {
		dispatch(getCategories());

		try {
			const response = await fetch(`${API_URL}/categories/`);
			const data = await response.json();

			dispatch(getCategoriesSuccess(data));
		} catch (error) {
			dispatch(getCategoriesFailure());
		}
	};
}
