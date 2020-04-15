import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { fetchCategories } from "../actions/categoriesActions";

const Category = ({ category }) => {
	return <li>{category.name}</li>;
};
const Categories = ({ dispatch, loading, categories, hasErrors }) => {
	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const renderCategories = () => {
		if (loading) return <p>Loading categories...</p>;
		if (hasErrors) return <p>Unable to display categories.</p>;

		return (
			<ul>
				{categories.map((category, key) => (
					<Category key={key} category={category} />
				))}
			</ul>
		);
	};
	return (
		<section>
			<h1>Categories</h1>
			<Button
				content="Refresh"
				loading={loading}
				onClick={() => dispatch(fetchCategories())}
			/>
			{renderCategories()}
		</section>
	);
};

const mapStateToProps = (state) => ({
	loading: state.categories.loading,
	categories: state.categories.categories,
	hasErrors: state.categories.hasErrors,
});
export default connect(mapStateToProps)(Categories);
