import {
	API_URL,
	POST_ORDER,
	POST_ORDER_SUCCESS,
	POST_ORDER_FAILURE,
} from "../../utilities/constants";

const postOrderBegin = () => ({ type: POST_ORDER });
const postOrderSuccess = (response) => ({
	type: POST_ORDER_SUCCESS,
	payload: response,
});
const postOrderFailure = () => ({ type: POST_ORDER_FAILURE });

export function postOrder(order) {
	return async (dispatch) => {
		dispatch(postOrderBegin());

		try {
			const request = await fetch(`${API_URL}/orders/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(order),
			});
			const response = await request.json();

			dispatch(postOrderSuccess(response));
		} catch (error) {
			dispatch(postOrderFailure());
		}
	};
}
