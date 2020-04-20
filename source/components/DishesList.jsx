import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Image, Icon } from "semantic-ui-react";

import { setOrderQuantity } from "../actions/orderActions";

import { SELECTED_DISHES } from "../utilities/constants";

const DishesList = ({
	dishes,

	dispatch,

	search,
	quantity,
	filterCategoriesChecked,
	filterCuisinesChecked,
}) => {
	const [filteredDishes, setFilteredDishes] = useState([]);

	useEffect(() => {
		setFilteredDishes(filterDishes(dishes));
	}, [dishes]);

	useEffect(() => {
		dispatch(setOrderQuantity(quantity));
	}, [quantity]);

	useEffect(() => {
		setFilteredDishes(filterDishes(dishes));
	}, [filterCategoriesChecked, filterCuisinesChecked]);

	const isValid = (dish) => {
		let searchValid = false;
		let categoriesValid = false;
		let cuisinesValid = false;

		if (search.length) {
			if (dish.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
				searchValid = true;
			}
		} else {
			searchValid = true;
		}

		if (filterCategoriesChecked.length) {
			if (filterCategoriesChecked.indexOf(dish.category.name) !== -1) categoriesValid = true;
		} else {
			categoriesValid = true;
		}

		if (filterCuisinesChecked.length) {
			if (filterCuisinesChecked.indexOf(dish.cuisine.name) !== -1) cuisinesValid = true;
		} else {
			cuisinesValid = true;
		}

		return searchValid && categoriesValid && cuisinesValid;
	};

	const filterDishes = (dishes = []) => {
		let filteredDishes = [];

		dishes.map((dish) => {
			if (true) filteredDishes.push(dish);
		});

		return filteredDishes;
	};

	const handleDish = (dishId) => {
		let selectedDishes = JSON.parse(localStorage.getItem(SELECTED_DISHES));
		if (selectedDishes === null) {
			localStorage.setItem(
				SELECTED_DISHES,
				JSON.stringify([
					{
						id: dishId,
						quantity: 1,
					},
				])
			);
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
				dispatch(setOrderQuantity(++quantity));
			} else {
				localStorage.setItem(
					SELECTED_DISHES,
					JSON.stringify([
						...selectedDishes,
						{
							id: dishId,
							quantity: 1,
						},
					])
				);
				dispatch(setOrderQuantity(++quantity));
			}
		}
	};

	return (
		<>
			<Card.Group stackable centered>
				{filteredDishes.map((dish) =>
					isValid(dish) ? (
						<Card key={dish.id} onClick={() => handleDish(dish.id)}>
							<Image src={dish.image} centered rounded />
							<Card.Content>
								<Card.Header>{dish.name}</Card.Header>
							</Card.Content>
							<Card.Content extra>
								<Icon name="globe" />
								<span>{dish.cuisine.name}</span>
							</Card.Content>
							<Card.Content extra>
								<Icon name="food" />
								<span>{dish.category.name}</span>
							</Card.Content>
						</Card>
					) : null
				)}
			</Card.Group>
		</>
	);
};

const mapStateToProps = (state) => ({
	search: state.search.value,
	quantity: state.order.quantity,
	filterCategoriesChecked: state.filterCategories.checked,
	filterCuisinesChecked: state.filterCuisines.checked,
});

export default connect(mapStateToProps)(DishesList);
