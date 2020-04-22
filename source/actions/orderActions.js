import {
	ORDER_QUANTITY,
	SELECTED_DISHES,
	SET_ORDER_DISHES,
	SET_ORDER_QUANTITY,
} from "../utilities/constants";

export const setOrderDishes = (orderDishes) => ({
	type: SET_ORDER_DISHES,
	payload: orderDishes,
});
export const setOrderQuantity = (orderQuantity) => ({
	type: SET_ORDER_QUANTITY,
	payload: orderQuantity,
});

export const setOrderDishe = (dishId) => {
	return (dispatch, getState) => {
		const quantity = getState().order.quantity;
		let selectedDishes = [...getState().order.dishes];

		if (selectedDishes === []) {
			localStorage.setItem(SELECTED_DISHES, JSON.stringify([{ id: dishId, quantity: 1 }]));
			dispatch(setOrderDishes([{ id: dishId, quantity: 1 }]));
			localStorage.setItem(ORDER_QUANTITY, 1);
			dispatch(setOrderQuantity(1));
		} else {
			let isExists = false;
			let dishIdCash = null;

			selectedDishes.map((dish, id) => {
				if (dish.id === dishId) {
					isExists = true;
					dishIdCash = id;
				}
			});

			if (isExists) {
				selectedDishes[dishIdCash].quantity = ++selectedDishes[dishIdCash].quantity;

				localStorage.setItem(SELECTED_DISHES, JSON.stringify([...selectedDishes]));
				dispatch(setOrderDishes([...selectedDishes]));
				localStorage.setItem(ORDER_QUANTITY, quantity + 1);
				dispatch(setOrderQuantity(quantity + 1));
			} else {
				localStorage.setItem(
					SELECTED_DISHES,
					JSON.stringify([...selectedDishes, { id: dishId, quantity: 1 }])
				);
				dispatch(setOrderDishes([...selectedDishes, { id: dishId, quantity: 1 }]));
				localStorage.setItem(ORDER_QUANTITY, quantity + 1);
				dispatch(setOrderQuantity(quantity + 1));
			}
		}
	};
};
export const setOrderDishSubstraction = (dishId) => {
	return (dispatch, getState) => {
		const quantity = getState().order.quantity;
		let selectedDishes = [...getState().order.dishes];

		let dishIdCash = null;

		selectedDishes.map((dish, id) => {
			if (dish.id === dishId) {
				dishIdCash = id;
			}
		});

		if (selectedDishes[dishIdCash].quantity > 1) {
			selectedDishes[dishIdCash].quantity = --selectedDishes[dishIdCash].quantity;

			localStorage.setItem(SELECTED_DISHES, JSON.stringify([...selectedDishes]));
			dispatch(setOrderDishes([...selectedDishes]));
			localStorage.setItem(ORDER_QUANTITY, quantity - 1);
			dispatch(setOrderQuantity(quantity - 1));
		} else {
			localStorage.setItem(ORDER_QUANTITY, quantity - selectedDishes[dishIdCash].quantity);
			dispatch(setOrderQuantity(quantity - selectedDishes[dishIdCash].quantity));
			selectedDishes.splice(dishIdCash, 1);
			localStorage.setItem(SELECTED_DISHES, JSON.stringify([...selectedDishes]));
			dispatch(setOrderDishes([...selectedDishes]));
		}
	};
};
export const setOrderDishRemove = (dishId) => {
	return (dispatch, getState) => {
		const quantity = getState().order.quantity;
		let selectedDishes = [...getState().order.dishes];

		let dishIdCash = null;

		selectedDishes.map((dish, id) => {
			if (dish.id === dishId) {
				dishIdCash = id;
			}
		});

		localStorage.setItem(ORDER_QUANTITY, quantity - selectedDishes[dishIdCash].quantity);
		dispatch(setOrderQuantity(quantity - selectedDishes[dishIdCash].quantity));
		selectedDishes.splice(dishIdCash, 1);
		localStorage.setItem(SELECTED_DISHES, JSON.stringify([...selectedDishes]));
		dispatch(setOrderDishes([...selectedDishes]));
	};
};
