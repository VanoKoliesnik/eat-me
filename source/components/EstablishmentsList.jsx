import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Image, Icon } from "semantic-ui-react";

import Loading from "./Loading";
import Reload from "./Reload";

import { fetchEstablishments } from "../actions/fetchedActions/establishmentsActions";

import { SELECTED_ESTABLISHMENT_ID } from "../utilities/constants";

const EstablishmentsList = ({
	dispatch,

	establishments,
	loadingEstablishments,
	hasErrorsEstablishments,

	search,
	filterCategoriesChecked,
	filterCuisinesChecked,
}) => {
	const [filteredEstablishments, setFilteredEstablishments] = useState([]);

	useEffect(() => {
		dispatch(fetchEstablishments());
	}, [dispatch]);

	useEffect(() => {
		setFilteredEstablishments(establishments);
	}, [establishments]);

	useEffect(() => {
		setFilteredEstablishments(filterEstablishments(establishments));
	}, [filterCategoriesChecked, filterCuisinesChecked]);

	const reload = () => {
		dispatch(fetchEstablishments());
	};

	const isValid = (establishment) => {
		let searchValid = false;
		let categoriesValid = false;
		let cuisinesValid = false;

		if (search.length) {
			if (establishment.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
				searchValid = true;
			}
		} else {
			searchValid = true;
		}

		if (filterCategoriesChecked.length) {
			if (filterCategoriesChecked.indexOf(establishment.category.name) !== -1)
				categoriesValid = true;
		} else {
			categoriesValid = true;
		}

		if (filterCuisinesChecked.length) {
			establishment.cuisine.map((cuisine) => {
				filterCuisinesChecked.map((checkedCuisines) => {
					if (cuisine.name === checkedCuisines) cuisinesValid = true;
				});
			});
		} else {
			cuisinesValid = true;
		}

		return searchValid && categoriesValid && cuisinesValid;
	};

	const filterEstablishments = (establishments) => {
		let filteredEstablishments = [];

		establishments.map((establishment) => {
			if (isValid(establishment)) filteredEstablishments.push(establishment);
		});

		return filteredEstablishments;
	};

	return (
		<>
			<Card.Group stackable centered>
				{loadingEstablishments ? (
					<Loading />
				) : hasErrorsEstablishments ? (
					<Reload reload={reload} />
				) : (
					filteredEstablishments.map((establishment) =>
						isValid(establishment) ? (
							<Card
								href="/establishment"
								key={establishment.id}
								onClick={() =>
									localStorage.setItem(
										SELECTED_ESTABLISHMENT_ID,
										establishment.id
									)
								}
							>
								<Image src={establishment.image} centered rounded />
								<Card.Content>
									<Card.Header>{establishment.name}</Card.Header>
								</Card.Content>
								<Card.Content extra>
									<Icon name="globe" />
									{establishment.cuisine.map((cuisineValue, key) => {
										return key === establishment.cuisine.length - 1 ? (
											<span key={key}>{cuisineValue.name}</span>
										) : (
											<span key={key}>{cuisineValue.name}/</span>
										);
									})}
								</Card.Content>
								<Card.Content extra>
									<Icon name="food" />
									<span>{establishment.category.name}</span>
								</Card.Content>
							</Card>
						) : null
					)
				)}
			</Card.Group>
		</>
	);
};

const mapStateToProps = (state) => ({
	establishments: state.establishments.establishments,
	loadingEstablishments: state.establishments.loading,
	hasErrorsEstablishments: state.establishments.hasErrors,

	search: state.search.value,
	filterCategoriesChecked: state.filterCategories.checked,
	filterCuisinesChecked: state.filterCuisines.checked,
});

export default connect(mapStateToProps)(EstablishmentsList);
