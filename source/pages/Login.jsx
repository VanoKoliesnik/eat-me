import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import md5 from "md5";
import { Grid, Segment, Form, Button, Message } from "semantic-ui-react";

import Header from "../components/Header";

import { fetchAccounts } from "../actions/fetchedActions/accountsActions";

import { ACCOUNT_ID } from "../utilities/constants";

const Login = ({ dispatch, accounts, accountsLoading, accountsHasErrors }) => {
	const [accountId, setAccountId] = useState(null);
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		dispatch(fetchAccounts());
	}, [dispatch]);

	useEffect(() => {
		localStorage.setItem(ACCOUNT_ID, accountId);
	}, [accountId]);

	const isValid = (loginData) => {
		let valid = false;

		accounts.map((accountData) => {
			if (accountData.username === loginData.username) {
				if (accountData.password === md5(loginData.password)) {
					valid = true;
					setAccountId(accountData.id);
				}
			}
		});

		return valid;
	};

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setLoginData({ ...accountData, [name]: value });
	};

	const handleSubmit = () => {
		if (isValid(loginData)) {
			console.log("Logged In!");
		} else {
			console.log("Nope!");
		}
	};

	return (
		<>
			<Header />

			<Grid centered>
				<Grid.Column width={6}>
					<Segment>
						<Form loading={accountsLoading}>
							<Form.Field>
								<label htmlFor="username">Логін</label>
								<input
									type="text"
									id="username"
									placeholder="Логін"
									name="username"
									onChange={handleInput}
								/>
							</Form.Field>
							<Form.Field>
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
								Увійти
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
});

export default connect(mapStateToProps)(Login);
