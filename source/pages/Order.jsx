import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	Grid,
	Segment,
	Message,
	Tab,
	Image,
	Icon,
	Button,
	Form,
	Dropdown,
	Card,
} from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

import Header from "../components/Header";
import Loading from "../components/Loading";
import Reload from "../components/Reload";

import { fetchAccounts } from "../actions/fetchedActions/accountsActions";
import { fetchDishes } from "../actions/fetchedActions/dishesActions";
import { postOrder } from "../actions/fetchedActions/postOrderActions";
import {
	setOrderDish,
	setOrderDishSubstraction,
	setOrderDishRemove,
} from "../actions/orderActions";
import { setEmptyLocalStorageDispatch } from "../actions/orderActions";
import { getAccountId } from "../actions/accountIdActions";

const Dishes = ({ dispatch, dishes, dishesQuantity }) => {
	const handleAdditionQuantity = (id) => {
		dispatch(setOrderDish(id));
	};

	const handleSubstractionQuantity = (id) => {
		dispatch(setOrderDishSubstraction(id));
	};

	const handleRemoveQuantity = (id) => {
		dispatch(setOrderDishRemove(id));
	};

	return (
		<>
			<Card.Group stackable centered style={{ padding: 20 }}>
				{dishes.map((dish) =>
					dishesQuantity.map((dishQuantity) =>
						dish.id === dishQuantity.id ? (
							<Card key={dish.id}>
								<Image src={dish.image} centered rounded />
								<Card.Content>
									<Card.Header>{dish.name}</Card.Header>
								</Card.Content>

								<Card.Content extra>
									<Grid>
										<Grid.Column width={8}>
											<Grid.Row>
												<Icon name="globe" />
												<span>{dish.cuisine.name}</span>
											</Grid.Row>
											<Grid.Row>
												<Icon name="food" />
												<span>{dish.category.name}</span>
											</Grid.Row>
										</Grid.Column>
										<Grid.Column width={8}>
											<Grid.Row>
												<Icon name="usd" />
												<span>{dish.price} грн</span>
											</Grid.Row>
											<Grid.Row>
												<Icon name="law" />
												<span>{dish.weight} г</span>
											</Grid.Row>
										</Grid.Column>
									</Grid>
								</Card.Content>

								<Card.Content extra>
									Кіл-ть порцій: {dishQuantity.quantity}
								</Card.Content>

								<Card.Content extra>
									<Button icon onClick={() => handleAdditionQuantity(dish.id)}>
										<Icon name="add" color="green" />
									</Button>
									<Button
										icon
										onClick={() => handleSubstractionQuantity(dish.id)}
									>
										<Icon name="minus" color="yellow" />
									</Button>
									<Button icon onClick={() => handleRemoveQuantity(dish.id)}>
										<Icon name="trash alternate" color="red" />
									</Button>
								</Card.Content>
							</Card>
						) : // 				<Grid.Row>Кіл-ть порцій: {dishQuantity.quantity}</Grid.Row>
						// 				<Grid.Row>
						// 					<Grid columns={2}>
						// 						<Grid.Column>
						// 							<Button
						// 								icon
						// 								onClick={() => handleAdditionQuantity(dish.id)}
						// 							>
						// 								<Icon name="add" color="green" />
						// 							</Button>
						// 							<Button
						// 								icon
						// 								onClick={() => handleSubstractionQuantity(dish.id)}
						// 							>
						// 								<Icon name="minus" color="yellow" />
						// 							</Button>
						// 						</Grid.Column>
						// 						<Grid.Column>
						// 							<Button
						// 								icon
						// 								onClick={() => handleRemoveQuantity(dish.id)}
						// 							>
						// 								<Icon name="trash alternate" color="red" />
						// 							</Button>
						// 						</Grid.Column>
						// 					</Grid>
						// 				</Grid.Row>
						// 			</Grid>
						// 		</Grid.Column>
						// 	</Grid>
						// </Grid.Column>
						null
					)
				)}
			</Card.Group>
		</>
	);
};

const OrderCredentials = ({
	dispatch,
	defaultAccount = {},
	dishes,
	orderDishes,
	orderQuantity,
	orderTotalPrice,
	accountId,
}) => {
	const [paymentMethodOptions] = useState([
		{
			key: "cash",
			text: "Оплата готівкова кур'єру",
			value: "cash",
		},
		{
			key: "cashless",
			text: "Оплата безготівкова кур'єру",
			value: "cashless",
		},
	]);
	const [orderData, setOrderData] = useState({
		name: "",
		surname: "",
		customerPhone: "",
		paymentMethod: "",
		quantity: "",
		totalPrice: "",
		orderDetail: "",
	});

	useEffect(() => {
		setOrderData({
			...orderData,
			name: defaultAccount.first_name,
			surname: defaultAccount.last_name,
			customerPhone: defaultAccount.phone,

			quantity: orderQuantity,
			totalPrice: orderTotalPrice,
		});
	}, [defaultAccount, orderQuantity]);

	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setOrderData({ ...orderData, [name]: value });
	};

	const handleDropdown = (e, d) => {
		setOrderData({ ...orderData, paymentMethod: d.value });
	};

	const isValid = (order) => {
		let valid = true;

		for (let property in order) {
			if (property === "orderList") {
				if (order[property] === []) {
					valid = false;
				}
			} else if (
				property !== "orderDetail" &&
				(order[property] === "" || order[property] === "[]")
			) {
				valid = false;
			}
		}

		return valid;
	};

	const handleSubmit = () => {
		const order = {
			name: orderData.name,
			surname: orderData.surname,
			customerPhone: orderData.customerPhone,
			paymentMethod: orderData.paymentMethod,
			orderDetail: orderData.orderDetail,
			totalQuantity: orderData.quantity,
			totalPrice: orderData.totalPrice,
			orderList: dishes,
			orderListTextField: JSON.stringify(orderDishes),
			user_id: accountId,
		};
		if (isValid(order)) {
			toast({
				type: "success",
				icon: "checkmark",
				title: "Успіх",
				description:
					"Дякуємо за замовлення. Наш адміністратор зв'яжиться з Вами для уточнення деталей",
				animation: "fly left",
				time: 10000,
			});
			setTimeout(() => (window.location = "/"), 10000);
			dispatch(setEmptyLocalStorageDispatch());
			dispatch(postOrder(order));
		} else {
			toast({
				type: "warning",
				icon: "warning",
				title: "Помилка",
				description: "Перевірте, щоб усі поля були заповнені",
				animation: "fly left",
				time: 2000,
			});
		}
	};

	return (
		<>
			<Grid.Column
				mobile={16}
				tablet={8}
				computer={8}
				largeScreen={6}
				widescreen={6}
			>
				<Form>
					<Form.Field required>
						<label>Ім'я</label>
						<input
							placeholder="Ім'я"
							type="text"
							name="name"
							value={orderData.name}
							onChange={handleInput}
						/>
					</Form.Field>
					<Form.Field required>
						<label>Прізвище</label>
						<input
							placeholder="Прізвище"
							type="text"
							name="surname"
							value={orderData.surname}
							onChange={handleInput}
						/>
					</Form.Field>
					<Form.Field required>
						<label>Телефон</label>
						<input
							placeholder="Телефон"
							type="tel"
							name="customerPhone"
							value={orderData.customerPhone}
							onChange={handleInput}
						/>
					</Form.Field>
					<Form.Field>
						<label>Спосіб оплати:</label>
						<Dropdown
							placeholder="Спосіб оплати"
							fluid
							selection
							value={orderData.paymentMethod}
							options={paymentMethodOptions}
							onChange={handleDropdown}
						/>
					</Form.Field>
					<Form.Field>
						<label>Коментар: </label>
						<textarea
							cols="15"
							rows="3"
							placeholder="Коментар"
							name="orderDetail"
							value={orderData.orderDetail}
							onChange={handleInput}
						></textarea>
					</Form.Field>
					<Form.Field>
						<Segment>
							<div>
								<label>Кількість порцій:</label> {orderData.quantity}
							</div>
							<div>
								<label>Сума замовлення:</label> {orderData.totalPrice} грн
							</div>
						</Segment>
					</Form.Field>
					<Button type="submit" onClick={handleSubmit} fluid color="teal">
						Підтвердити
					</Button>
				</Form>
			</Grid.Column>
		</>
	);
};

const Order = ({
	dispatch,

	accountId,

	account,
	loadingAccount,
	hasErrorsAccount,

	dishes,
	loadingDishes,
	hasErrorsDishes,

	orderDishes,
	orderQuantity,
	orderTotalPrice,
}) => {
	const [filteredDishes, setFilteredDishes] = useState([]);

	useEffect(() => {
		dispatch(getAccountId());

		dispatch(fetchDishes());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAccounts(accountId));
	}, [accountId]);

	const filterDishes = (dishes) => {
		const filteredDishes = [];

		dishes.map((dish) => {
			orderDishes.map((orderDish) => {
				if (dish.id === orderDish.id)
					filteredDishes.push(
						Object.assign(dish, { quantity: orderDish.quantity })
					);
			});
		});

		return filteredDishes;
	};

	useEffect(() => {
		setFilteredDishes(filterDishes(dishes));
	}, [dishes]);

	const reload = () => {
		dispatch(getAccountId());

		if (accountId !== null) {
			dispatch(fetchAccounts(accountId));
		}
		dispatch(fetchDishes());
	};

	const panes = [
		{
			menuItem: "Зміст замовлення",
			render: () => (
				<Tab.Pane>
					<Grid centered>
						{loadingDishes ? (
							<Grid.Column>
								<Loading />
							</Grid.Column>
						) : hasErrorsDishes ? (
							<Grid.Column>
								<Reload reload={reload} />
							</Grid.Column>
						) : (
							<Dishes
								dispatch={dispatch}
								dishes={filteredDishes}
								dishesQuantity={orderDishes}
							/>
						)}
					</Grid>
				</Tab.Pane>
			),
		},
		{
			menuItem: "Деталі замовлення",
			render: () => (
				<Tab.Pane>
					<Grid centered>
						{loadingAccount ? (
							<Grid.Column>
								<Loading />
							</Grid.Column>
						) : hasErrorsAccount ? (
							<Grid.Column>
								<Reload reload={reload} />
							</Grid.Column>
						) : (
							<OrderCredentials
								dispatch={dispatch}
								accountId={accountId}
								defaultAccount={account.accounts}
								dishes={filteredDishes}
								orderDishes={orderDishes}
								orderQuantity={orderQuantity}
								orderTotalPrice={orderTotalPrice}
							/>
						)}
					</Grid>
				</Tab.Pane>
			),
		},
	];

	return (
		<>
			<Header />
			<Grid padded>
				{accountId === null ? (
					<Grid.Column>
						<Message warning>
							<Message.Header>Ви не авторизовані!</Message.Header>
							<Message.Content>
								<p>
									<a href="/login">Увійдіть</a> або{" "}
									<a href="/registration">створіть акаунт</a> для оформлення
									замовлення
								</p>
							</Message.Content>
						</Message>
					</Grid.Column>
				) : (
					<Grid.Column>
						<Tab panes={panes} />
					</Grid.Column>
				)}
			</Grid>
			<SemanticToastContainer position="bottom-right" />
		</>
	);
};

const mapStateToProps = (state) => ({
	accountId: state.accountId.id,

	account: state.accounts,
	loadingAccount: state.accounts.loading,
	hasErrorsAccount: state.accounts.hasErrors,

	dishes: state.dishes.dishes,
	loadingDishes: state.dishes.loading,
	hasErrorsDishes: state.dishes.hasErrors,

	orderDishes: state.order.dishes,
	orderQuantity: state.order.quantity,
	orderTotalPrice: state.order.totalPrice,
});

export default connect(mapStateToProps)(Order);
