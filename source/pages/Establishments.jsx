import React from "react";
import { Grid, Segment } from "semantic-ui-react";

import Header from "../components/Header";
import FilterEstablishmentsCategoriesCuisines from "../components/FilterEstablishmentsCategoriesCuisines";
import Search from "../components/Search";
import EstablishmentsList from "../components/EstablishmentsList";

const Establishments = () => {
	return (
		<>
			<Header />

			<Grid padded>
				<Grid.Column mobile={16} tablet={5} computer={5} largeScreen={4} widescreen={3}>
					<FilterEstablishmentsCategoriesCuisines />
				</Grid.Column>

				<Grid.Column mobile={16} tablet={11} computer={11} largeScreen={12} widescreen={13}>
					<Segment.Group>
						<Segment>
							<Search fluid />
						</Segment>
						<Segment basic>
							<EstablishmentsList />
						</Segment>
					</Segment.Group>
				</Grid.Column>
			</Grid>
		</>
	);
};

export default Establishments;
