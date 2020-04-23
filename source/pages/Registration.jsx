import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import md5 from "md5";
import { Grid, Segment, Form, Button, Message } from "semantic-ui-react";

import Header from "../components/Header";

import { fetchAccounts } from "../actions/fetchedActions/accountsActions";
import { postAccount } from "../actions/fetchedActions/postAccountActions";

const Registration = ({
	dispatch,
	accounts,
	accountsLoading,
	accountsHasErrors,
	accountResponse,
	accountLoading,
	accountHasErrors,
}) => {
	const [registrationData, setRegistrationData] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		username: "",
		password: "",
	});

	useEffect(() => {
		dispatch(fetchAccounts());
	}, [dispatch]);

	const isValid = (registrationData) => {
		let valid = true;

		accounts.map((accountData) => {
			if (accountData.username === registrationData.username) {
				valid = false;
			}
		});
		if (registrationData.username === "") valid = false;
		if (registrationData.password === "") valid = false;

		return valid;
	};

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setRegistrationData({ ...registrationData, [name]: value });
	};

	const handleSubmit = () => {
		if (isValid(registrationData)) {
			console.log("Registered!");
			dispatch(
				postAccount({ ...registrationData, password: md5(registrationData.password) })
			);
			console.log(accountResponse);
		} else {
			console.log("Nope!");
			console.log(accountResponse);
		}
	};

	return (
		<>
			<Header />

			<Grid centered>
				<Grid.Column width={6}>
					<Segment>
						<Form>
							<Form.Field>
								<label htmlFor="first_name">Ім'я</label>
								<input
									type="text"
									id="first_name"
									placeholder="Ім'я"
									name="first_name"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field>
								<label htmlFor="last_name">Прізвище</label>
								<input
									type="text"
									id="last_name"
									placeholder="Прізвище"
									name="last_name"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field>
								<label htmlFor="phone">Телефон</label>
								<input
									type="tel"
									id="phone"
									placeholder="Телефон"
									name="phone"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field>
								<label htmlFor="email">Пошта</label>
								<input
									type="email"
									id="email"
									placeholder="Пошта"
									name="email"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field required>
								<label htmlFor="username">Логін</label>
								<input
									type="text"
									id="username"
									placeholder="Логін"
									name="username"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field required>
								<label htmlFor="password">Пароль</label>
								<input
									type="password"
									id="password"
									placeholder="Пароль"
									name="password"
									onChange={handleInput}
								/>
							</Form.Field>
							<Button type="submit" onClick={handleSubmit}>
								Зареєструватися
							</Button>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		</>
	);
};

const mapStateToProps = (state) => ({
	accounts: state.accounts.accounts,
	accountsLoading: state.accounts.loading,
	accountsHasErrors: state.accounts.hasErrors,

	accountResponse: state.postAccount.response,
	accountLoading: state.postAccount.loading,
	accountHasErrors: state.postAccount.hasErrors,
});

export default connect(mapStateToProps)(Registration);
