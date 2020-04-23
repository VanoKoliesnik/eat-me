import {
	API_URL,
	POST_ACCOUNT,
	POST_ACCOUNT_SUCCESS,
	POST_ACCOUNT_FAILURE,
} from "../../utilities/constants";

const postAccountBegin = () => ({ type: POST_ACCOUNT });
const postAccountSuccess = (response) => ({
	type: POST_ACCOUNT_SUCCESS,
	payload: response,
});
const postAccountFailure = () => ({ type: POST_ACCOUNT_FAILURE });

export function postAccount(order) {
	return async (dispatch) => {
		dispatch(postAccountBegin());

		try {
			const request = await fetch(`${API_URL}/accounts/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(order),
			});
			const response = await request.json();

			dispatch(postAccountSuccess(response));
		} catch (error) {
			dispatch(postAccountFailure());
		}
	};
}
