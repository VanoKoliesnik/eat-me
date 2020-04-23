import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Image, Icon } from "semantic-ui-react";

import { setOrderDish, setOrderQuantity } from "../actions/orderActions";

const DishesList = ({
	dishes,

	dispatch,

	search,
	orderQuantity,
	filterCategoriesChecked,
	filterCuisinesChecked,
}) => {
	const [filteredDishes, setFilteredDishes] = useState([]);

	useEffect(() => {
		setFilteredDishes(filterDishes(dishes));
	}, [dishes]);

	useEffect(() => {
		dispatch(setOrderQuantity(orderQuantity));
	}, [orderQuantity]);

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
		dispatch(setOrderDish(dishId));
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
	orderDishes: state.order.dishes,
	orderQuantity: state.order.quantity,
	filterCategoriesChecked: state.filterCategories.checked,
	filterCuisinesChecked: state.filterCuisines.checked,
});

export default connect(mapStateToProps)(DishesList);
