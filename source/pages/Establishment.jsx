import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Segment, Grid, Image, Icon, Container } from "semantic-ui-react";

import Header from "../components/Header";
import Loading from "../components/Loading";
import Reload from "../components/Reload";
import FilterDishesCategoriesCuisines from "../components/FilterDishesCategoriesCuisines";
import Search from "../components/Search";
import DishesList from "../components/DishesList";

import { fetchEstablishments } from "../actions/fetchedActions/establishmentsActions";

import { SELECTED_ESTABLISHMENT_ID } from "../utilities/constants";

const EstablishmentHeader = ({ establishment }) => {
	return (
		<>
			<Grid.Column mobile={16} tablet={5} computer={5} largeScreen={4} widescreen={3}>
				<Image src={establishment.image} centered rounded />
			</Grid.Column>
			<Grid.Column mobile={16} tablet={11} computer={11} largeScreen={12} widescreen={13}>
				<Grid.Row>
					<h2>{establishment.name}</h2>
				</Grid.Row>
				<Grid.Row>
					<Container>{establishment.about}</Container>
				</Grid.Row>
				<Grid.Row>
					<Grid columns={2} padded stackable>
						<Grid.Column>
							<Grid.Row>
								<span>Час роботи:</span>
							</Grid.Row>
							<Grid.Row>
								<Icon name="hourglass start" />
								{establishment.timeFrom}
							</Grid.Row>
							<Grid.Row>
								<Icon name="hourglass end" />
								{establishment.timeBefore}
							</Grid.Row>
						</Grid.Column>
						<Grid.Column>
							<Grid.Row>
								<Icon name="phone" />
								{establishment.phone}
							</Grid.Row>
							<Grid.Row>
								<Icon name="map marker alternate" />
								{establishment.position}
							</Grid.Row>
						</Grid.Column>
					</Grid>
				</Grid.Row>
			</Grid.Column>
		</>
	);
};

const Establishment = ({
	dispatch,
	establishment,
	loadingEstablishment,
	hasErrorsEstablishment,
}) => {
	useEffect(() => {
		let establishmentId = localStorage.getItem(SELECTED_ESTABLISHMENT_ID);
		dispatch(fetchEstablishments(establishmentId));
	}, [dispatch]);

	const reload = () => {
		let establishmentId = localStorage.getItem(SELECTED_ESTABLISHMENT_ID);
		dispatch(fetchEstablishments(establishmentId));
	};

	return (
		<>
			<Header />

			<Grid padded divided stretched>
				<Grid.Row centered>
					{loadingEstablishment ? (
						<Loading />
					) : hasErrorsEstablishment ? (
						<Reload reload={reload} />
					) : (
						<EstablishmentHeader establishment={establishment} />
					)}
				</Grid.Row>

				<Grid.Row>
					<Grid padded>
						<Grid.Column
							mobile={16}
							tablet={5}
							computer={5}
							largeScreen={4}
							widescreen={3}
						>
							<FilterDishesCategoriesCuisines />
						</Grid.Column>

						<Grid.Column
							mobile={16}
							tablet={11}
							computer={11}
							largeScreen={12}
							widescreen={13}
						>
							<Segment.Group>
								<Segment>
									<Search fluid />
								</Segment>
								<Segment basic>
									<DishesList dishes={establishment.menu} />
								</Segment>
							</Segment.Group>
						</Grid.Column>
					</Grid>
				</Grid.Row>
			</Grid>
		</>
	);
};

const mapStateToProps = (state) => ({
	establishment: state.establishments.establishments,
	loadingEstablishment: state.establishments.loading,
	hasErrorsEstablishment: state.establishments.hasErrors,
});

export default connect(mapStateToProps)(Establishment);
