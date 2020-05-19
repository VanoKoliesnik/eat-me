import {
	ORDER_DISHES,
	ORDER_QUANTITY,
	ORDER_TOTAL_PRICE,
	SET_ORDER_DISHES,
	SET_ORDER_QUANTITY,
	SET_ORDER_TOTAL_PRICE,
} from "../utilities/constants";

export const setOrderDishes = (orderDishes) => ({
	type: SET_ORDER_DISHES,
	payload: orderDishes,
});
export const setOrderQuantity = (orderQuantity) => ({
	type: SET_ORDER_QUANTITY,
	payload: orderQuantity,
});
export const setOrderTotalPrice = (orderTotalPrice) => ({
	type: SET_ORDER_TOTAL_PRICE,
	payload: orderTotalPrice,
});

const setLocalStorageDispatch = (
	dispatch,
	dish,
	quantity = 0,
	totalPrice = 0
) => {
	localStorage.setItem(ORDER_DISHES, JSON.stringify(dish));
	dispatch(setOrderDishes(dish));

	localStorage.setItem(ORDER_QUANTITY, quantity);
	dispatch(setOrderQuantity(quantity));

	localStorage.setItem(ORDER_TOTAL_PRICE, totalPrice);
	dispatch(setOrderTotalPrice(totalPrice));
};

export const setEmptyLocalStorageDispatch = () => {
	return (dispatch) => {
		localStorage.setItem(ORDER_DISHES, JSON.stringify([]));
		dispatch(setOrderDishes([]));

		localStorage.setItem(ORDER_QUANTITY, 0);
		dispatch(setOrderQuantity(0));

		localStorage.setItem(ORDER_TOTAL_PRICE, 0);
		dispatch(setOrderTotalPrice(0));
	};
};

export const setOrderDish = (dishId) => {
	return (dispatch, getState) => {
		const quantity = getState().order.quantity;
		const totalPrice = getState().order.totalPrice;
		const dishes = [...getState().dishes.dishes];

		let selectedDishes = [...getState().order.dishes];
		let dish, selectedDish;

		dishes.map((dishCash) => {
			if (dishCash.id === dishId) {
				dish = dishCash;
			}
		});
		selectedDishes.map((dishCash) => {
			if (dishCash.id === dishId) {
				selectedDish = dishCash;
			}
		});

		if (selectedDishes === []) {
			setLocalStorageDispatch(
				dispatch,
				[{ id: dish.id, name: dish.name, quantity: 1 }],
				1,
				dish.price
			);
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
				selectedDishes[dishIdCash].quantity = ++selectedDishes[dishIdCash]
					.quantity;

				setLocalStorageDispatch(
					dispatch,
					[...selectedDishes],
					quantity + 1,
					totalPrice + dish.price
				);
			} else {
				setLocalStorageDispatch(
					dispatch,
					[...selectedDishes, { id: dishId, name: dish.name, quantity: 1 }],
					quantity + 1,
					totalPrice + dish.price
				);
			}
		}
	};
};

export const setOrderDishSubstraction = (dishId) => {
	return (dispatch, getState) => {
		const quantity = getState().order.quantity;
		const totalPrice = getState().order.totalPrice;
		const dishes = [...getState().dishes.dishes];

		let selectedDishes = [...getState().order.dishes];

		let dishIdCash = null;
		let dish;

		dishes.map((dishCash) => {
			if (dishCash.id === dishId) {
				dish = dishCash;
			}
		});
		selectedDishes.map((dish, id) => {
			if (dish.id === dishId) {
				dishIdCash = id;
			}
		});

		if (selectedDishes[dishIdCash].quantity > 1) {
			selectedDishes[dishIdCash].quantity = --selectedDishes[dishIdCash]
				.quantity;

			setLocalStorageDispatch(
				dispatch,
				[...selectedDishes],
				quantity - 1,
				totalPrice - dish.price
			);
		} else {
			const dishQuantityCash = selectedDishes[dishIdCash].quantity;

			selectedDishes.splice(dishIdCash, 1);

			setLocalStorageDispatch(
				dispatch,
				[...selectedDishes],
				quantity - dishQuantityCash,
				totalPrice - dish.price
			);
		}
	};
};

export const setOrderDishRemove = (dishId) => {
	return (dispatch, getState) => {
		const quantity = getState().order.quantity;
		const totalPrice = getState().order.totalPrice;
		const dishes = [...getState().dishes.dishes];

		let selectedDishes = [...getState().order.dishes];
		let dishIdCash = null;
		let dish;

		dishes.map((dishCash) => {
			if (dishCash.id === dishId) {
				dish = dishCash;
			}
		});
		selectedDishes.map((dish, id) => {
			if (dish.id === dishId) {
				dishIdCash = id;
			}
		});

		const dishQuantityCash = selectedDishes[dishIdCash].quantity;

		selectedDishes.splice(dishIdCash, 1);

		setLocalStorageDispatch(
			dispatch,
			[...selectedDishes],
			quantity - dishQuantityCash,
			totalPrice - dish.price * dishQuantityCash
		);
	};
};
