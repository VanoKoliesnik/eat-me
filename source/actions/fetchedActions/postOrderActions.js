import {
	API_URL,
	POST_ORDERS,
	POST_ORDERS_SUCCESS,
	POST_ORDERS_FAILURE,
} from "../../utilities/constants";

const postOrder = () => ({ type: POST_ORDERS });
const postOrderSuccess = (response) => ({
	type: POST_ORDERS_SUCCESS,
	payload: response,
});
const postOrderFailure = () => ({ type: POST_ORDERS_FAILURE });

export function postOrder(order) {
	return async (dispatch) => {
		dispatch(postOrder());

		try {
			const response = await fetch(`${API_URL}/orders/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(order),
			});
			const response = await response.json();

			dispatch(postOrderSuccess(response));
		} catch (error) {
			dispatch(postOrderFailure());
		}
	};
}
