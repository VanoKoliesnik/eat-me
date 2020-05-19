import {
	API_URL,
	GET_ORDERS,
	GET_ORDERS_SUCCESS,
	GET_ORDERS_FAILURE,
} from "../../utilities/constants";

const getOrders = () => ({ type: GET_ORDERS });
const getOrdersSuccess = (orders) => ({
	type: GET_ORDERS_SUCCESS,
	payload: orders,
});
const getOrdersFailure = () => ({ type: GET_ORDERS_FAILURE });

export function fetchOrders(accountId) {
	return async (dispatch) => {
		dispatch(getOrders());

		try {
			const response = await fetch(`${API_URL}/orders/`);
			const data = await response.json();
			const filteredData = [];

			data.map((item) => {
				if (item.user_id !== null && item.user_id === accountId) {
					filteredData.push(item);
				}
			});

			dispatch(getOrdersSuccess(filteredData));
		} catch (error) {
			dispatch(getOrdersFailure());
		}
	};
}
