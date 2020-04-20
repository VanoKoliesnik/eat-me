import { SET_ORDER_QUANTITY } from "../utilities/constants";

export const setOrderQuantity = (orderQuantity) => ({
	type: SET_ORDER_QUANTITY,
	payload: orderQuantity,
});
