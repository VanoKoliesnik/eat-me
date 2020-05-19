import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import md5 from "md5";
import { Grid, Segment, Button, Form } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

import Header from "../components/Header";
import Loading from "../components/Loading";
import Reload from "../components/Reload";

import { fetchAccounts } from "../actions/fetchedActions/accountsActions";
import { patchAccount } from "../actions/fetchedActions/patchAccountActions";
import { setAccountId, getAccountId } from "../actions/accountIdActions";

const ProfileData = ({ account }) => {
	return (
		<Grid>
			<Grid.Column mobile={6} tablet={6} computer={6}>
				<p>Ім'я:</p>
				<p>Прізвище:</p>
				<p>Телефон:</p>
				<p>Пошта:</p>
				<p>Логін:</p>
				<p>Пароль:</p>
			</Grid.Column>
			<Grid.Column mobile={10} tablet={10} computer={10}>
				<p>{account.first_name}</p>
				<p>{account.last_name}</p>
				<p>{account.phone}</p>
				<p>{account.email}</p>
				<p>{account.username}</p>
				<p>🤐</p>
			</Grid.Column>
		</Grid>
	);
};

const ProfileEditMode = ({
	dispatch,
	account,
	patchAccountLoading,
	reload,
}) => {
	const [newAccountData, setNewAccountData] = useState({
		id: account.id,
		first_name: account.first_name,
		last_name: account.last_name,
		phone: account.phone,
		email: account.email,

		username: account.username,
		oldPassword: "",

		newPassword: "",
	});

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setNewAccountData({ ...newAccountData, [name]: value });
	};

	const isValid = (newAccountData) => {
		let valid = true;

		for (let property in newAccountData) {
			if (property === "newPassword" || property === "oldPassword") {
				if (
					newAccountData[property] !== "" &&
					newAccountData[property] !== ""
				) {
					if (account.password !== md5(newAccountData.oldPassword)) {
						valid = false;
					}
					if (newAccountData.oldPassword === newAccountData.newPassword) {
						valid = false;
					}
				}
			} else {
				if (newAccountData[property] === "") {
					valid = false;
				}
			}
		}

		return valid;
	};

	const handleSubmit = () => {
		if (isValid(newAccountData)) {
			toast({
				type: "success",
				icon: "checkmark",
				title: "Готово",
				description: "Дані успішно редаговано",
				animation: "fly left",
				time: 10000,
			});
			dispatch(patchAccount(newAccountData));
			reload();
		} else {
			toast({
				type: "warning",
				icon: "warning",
				title: "Помилка",
				description: "Перевірте правильність заповнення полів",
				animation: "fly left",
				time: 2000,
			});
		}
	};

	return (
		<Form>
			<Form.Field>
				<label htmlFor="first_name">Ім'я</label>
				<input
					type="text"
					id="first_name"
					placeholder="Ім'я"
					name="first_name"
					value={newAccountData.first_name}
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
					value={newAccountData.last_name}
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
					value={newAccountData.phone}
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
					value={newAccountData.email}
					onChange={handleInput}
				/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="username">Логін</label>
				<input
					type="text"
					id="username"
					placeholder="Логін"
					name="username"
					value={newAccountData.username}
					onChange={handleInput}
				/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="oldPassword">Старий пароль</label>
				<input
					type="password"
					id="oldPassword"
					placeholder="Старий пароль"
					name="oldPassword"
					value={newAccountData.oldPassword}
					onChange={handleInput}
				/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="newPassword">Новий пароль</label>
				<input
					type="password"
					id="newPassword"
					placeholder="Новий пароль"
					name="newPassword"
					value={newAccountData.newPassword}
					onChange={handleInput}
				/>
			</Form.Field>
			<Button
				type="submit"
				onClick={handleSubmit}
				fluid
				color="teal"
				loading={patchAccountLoading}
			>
				Редагувати
			</Button>
		</Form>
	);
};

const Profile = ({
	dispatch,
	account,
	accountLoading,
	accountHasErrors,
	patchAccountResponse,
	patchAccountLoading,
	patchAccountHasErrors,
	accountId,
}) => {
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		dispatch(getAccountId());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAccounts(accountId));
	}, [accountId]);

	const reload = () => {
		dispatch(getAccountId());

		dispatch(fetchAccounts(accountId));
	};

	return (
		<>
			<Header />

			<Grid centered padded>
				<Grid.Column mobile={16} tablet={10} computer={10}>
					<Segment>
						{accountLoading ? (
							<Loading />
						) : accountHasErrors ? (
							<Reload reload={reload} />
						) : (
							<>
								{editMode ? (
									<ProfileEditMode
										dispatch={dispatch}
										account={account}
										patchAccountLoading={patchAccountLoading}
										reload={reload}
									/>
								) : (
									<ProfileData account={account} />
								)}
							</>
						)}
					</Segment>
				</Grid.Column>
				<Grid.Column mobile={16} tablet={6} computer={6}>
					<Button.Group vertical fluid>
						<Button fluid onClick={() => setEditMode(!editMode)}>
							{editMode ? "Відхилити" : "Редагувати"}
						</Button>
						<Button fluid onClick={() => (window.location = "/orders")}>
							Замовлення
						</Button>
						<Button
							fluid
							onClick={() => {
								dispatch(setAccountId(null));
								window.location = "/";
							}}
							color="red"
						>
							Вихід
						</Button>
					</Button.Group>
				</Grid.Column>
				<SemanticToastContainer position="bottom-right" />
			</Grid>
		</>
	);
};

const mapStateToProps = (state) => ({
	account: state.accounts.accounts,
	accountLoading: state.accounts.loading,
	accountHasErrors: state.accounts.hasErrors,

	patchAccountResponse: state.patchAccount.response,
	patchAccountLoading: state.patchAccount.loading,
	patchAccountHasErrors: state.patchAccount.hasErrors,

	accountId: state.accountId.id,
});

export default connect(mapStateToProps)(Profile);
