import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Checkbox, Header, Grid } from "semantic-ui-react";

import Loading from "./Loading";
import Reload from "./Reload";

import { fetchCategories } from "../actions/fetchedActions/categoriesActions";
import { fetchCuisines } from "../actions/fetchedActions/cuisinesActions";
import {
	toggleCategoriesChecked,
	uncheckedAllFilterCategories,
} from "../actions/filterCategoriesActions";
import {
	toggleCuisinesChecked,
	uncheckedAllFilterCuisines,
} from "../actions/filterCuisinesActions";

const MenuItem = ({ menuItem, checkedItems, handleChecked }) => {
	return (
		<Menu.Item>
			<Menu.Header>{menuItem.title}</Menu.Header>

			<Menu.Menu>
				{menuItem.dataset.map((itemValue, key) => {
					let checked = false;
					if (menuItem.title === "Категорії") {
						checked = checkedItems[0].indexOf(itemValue.name) === -1 ? false : true;
					} else if (menuItem.title === "Кухні") {
						checked = checkedItems[1].indexOf(itemValue.name) === -1 ? false : true;
					}
					return (
						<Menu.Item key={key}>
							<Checkbox
								toggle
								label={itemValue.name}
								value={itemValue.name}
								name={menuItem.title}
								checked={checked}
								onChange={handleChecked}
							/>
						</Menu.Item>
					);
				})}
			</Menu.Menu>
		</Menu.Item>
	);
};

const SidebarFilter = ({
	dispatch,

	dishesCategories,
	dishesLoadingCategories,
	dishesHasErrorsCategories,

	cuisines,
	loadingCuisines,
	hasErrorsCuisines,

	filterCategoriesChecked,
	filterCuisinesChecked,
}) => {
	const [filterData, setFilterData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasErrors, setHasErrors] = useState(false);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchCuisines());
	}, [dispatch]);

	useEffect(() => {
		setFilterData([
			{
				title: "Категорії",
				dataset: dishesCategories,
			},
			{
				title: "Кухні",
				dataset: cuisines,
			},
		]);
	}, [dishesCategories, cuisines]);

	useEffect(() => {
		if (dishesLoadingCategories && loadingCuisines) {
			setLoading(true);
		} else {
			setLoading(false);
		}

		if (dishesHasErrorsCategories || hasErrorsCuisines) {
			setHasErrors(true);
		} else {
			setHasErrors(false);
		}
	}, [dishesLoadingCategories, loadingCuisines, dishesHasErrorsCategories, hasErrorsCuisines]);

	const refreshData = () => {
		dispatch(fetchCategories());
		dispatch(fetchCuisines());
	};

	const handleChecked = (event, data) => {
		const { name, value } = data;

		if (name === "Категорії") {
			dispatch(toggleCategoriesChecked(value));
		} else if (name === "Кухні") {
			dispatch(toggleCuisinesChecked(value));
		}
	};

	return (
		<Menu vertical fluid>
			<Menu.Item header>
				<Header as="h3">Фільтр</Header>
			</Menu.Item>

			{loading ? (
				<Menu.Item>
					<Grid centered verticalAlign="middle">
						<Menu.Item>
							<Loading />
						</Menu.Item>
					</Grid>
				</Menu.Item>
			) : hasErrors ? (
				<Menu.Item>
					<Grid centered verticalAlign="middle">
						<Menu.Item>
							<Reload reload={refreshData} />
						</Menu.Item>
					</Grid>
				</Menu.Item>
			) : (
				filterData.map((menuItem, key) => {
					return (
						<MenuItem
							menuItem={menuItem}
							checkedItems={[filterCategoriesChecked, filterCuisinesChecked]}
							handleChecked={handleChecked}
							key={key}
						/>
					);
				})
			)}
		</Menu>
	);
};

const mapStateToProps = (state) => {
	return {
		dishesCategories: state.categories.categories,
		dishesLoadingCategories: state.categories.loading,
		dishesHasErrorsCategories: state.categories.hasErrors,

		cuisines: state.cuisines.cuisines,
		loadingCuisines: state.cuisines.loading,
		hasErrorsCuisines: state.cuisines.hasErrors,

		filterCategoriesChecked: state.filterCategories.checked,
		filterCuisinesChecked: state.filterCuisines.checked,
	};
};

export default connect(mapStateToProps)(SidebarFilter);
