import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Segment, Tab, Image, Icon, Button, Form, Dropdown } from "semantic-ui-react";

import Header from "../components/Header";

import { fetchAccounts } from "../actions/fetchedActions/accountsActions";
import { fetchDishes } from "../actions/fetchedActions/dishesActions";
import { postOrder } from "../actions/fetchedActions/postOrderActions";
import {
	setOrderDish,
	setOrderDishSubstraction,
	setOrderDishRemove,
} from "../actions/orderActions";

import { ACCOUNT_ID } from "../utilities/constants";

const Dishes = ({ dispatch, dishes, dishesQuantity }) => {
	const handleAdditionQuantity = (id) => {
		dispatch(setOrderDish(id));
	};

	const handleSubstractionQuantity = (id, quantity) => {
		dispatch(setOrderDishSubstraction(id));
	};

	const handleRemoveQuantity = (id) => {
		dispatch(setOrderDishRemove(id));
	};

	return (
		<>
			{dishes.map((dish) =>
				dishesQuantity.map((dishQuantity) =>
					dish.id === dishQuantity.id ? (
						<Grid.Row key={dish.id}>
							<Grid columns={3}>
								<Grid.Column>
									<Image src={dish.image} sizy="mini" centered rounded />
								</Grid.Column>
								<Grid.Column>
									<Grid.Row>
										<h3>{dish.name}</h3>
									</Grid.Row>
									<Grid.Row>
										<Grid padded>
											<Grid.Row>
												<Icon name="globe" />
												<span>{dish.cuisine.name}</span>
											</Grid.Row>
											<Grid.Row>
												<Icon name="food" />
												<span>{dish.category.name}</span>
											</Grid.Row>
										</Grid>
									</Grid.Row>
								</Grid.Column>
								<Grid.Column>
									<Grid.Row>
										<Grid>
											<Grid.Row>
												Кіл-ть порцій: {dishQuantity.quantity}
											</Grid.Row>
											<Grid.Row>
												<Grid columns={2}>
													<Grid.Column>
														<Button
															icon
															onClick={() =>
																handleAdditionQuantity(dish.id)
															}
														>
															<Icon name="add" color="green" />
														</Button>
														<Button
															icon
															onClick={() =>
																handleSubstractionQuantity(dish.id)
															}
														>
															<Icon name="minus" color="yellow" />
														</Button>
													</Grid.Column>
													<Grid.Column>
														<Button
															icon
															onClick={() =>
																handleRemoveQuantity(dish.id)
															}
														>
															<Icon
																name="trash alternate"
																color="red"
															/>
														</Button>
													</Grid.Column>
												</Grid>
											</Grid.Row>
										</Grid>
									</Grid.Row>
								</Grid.Column>
							</Grid>
						</Grid.Row>
					) : null
				)
			)}
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
			order_list: orderDishes,
		};
		dispatch(postOrder(order));
	};

	return (
		<>
			<Grid.Column tablet={4} computer={4} largeScreen={5} widescreen={5} />
			<Grid.Column mobile={16} tablet={8} computer={8} largeScreen={6} widescreen={6}>
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
								<label>Всього страв:</label> {orderData.quantity}
							</div>
							<div>
								<label>Сума замовлення:</label> {orderData.totalPrice}
							</div>
						</Segment>
					</Form.Field>
					<Button type="submit" onClick={handleSubmit}>
						Підтвердити
					</Button>
				</Form>
			</Grid.Column>
		</>
	);
};

const Order = ({
	dispatch,

	account,
	loadingAccount,
	hasErrorsAccount,

	dishes,
	loadingDishes,
	hasErrorsDishes,

	orderDishes,
	orderQuantity,
}) => {
	const [filteredDishes, setFilteredDishes] = useState([]);
	const [totalPrice, setTotalPrice] = useState("");

	useEffect(() => {
		const accountId = localStorage.getItem(ACCOUNT_ID);

		if (accountId !== null) {
			dispatch(fetchAccounts(accountId));
		}
		dispatch(fetchDishes());
	}, [dispatch]);

	const filterDishes = (dishes) => {
		const filteredDishes = [];

		dishes.map((dish) => {
			orderDishes.map((orderDish) => {
				if (dish.id === orderDish.id)
					filteredDishes.push(Object.assign(dish, { quantity: orderDish.quantity }));
			});
		});

		return filteredDishes;
	};

	useEffect(() => {
		setFilteredDishes(filterDishes(dishes));
	}, [dishes]);

	useEffect(() => {
		let totalPriceCash = 0;

		filteredDishes.map((dish) => {
			for (let i = 0; i < dish.quantity; i++) {
				totalPriceCash = totalPriceCash + dish.price;
			}
		});

		setTotalPrice(totalPriceCash);
	}, [filteredDishes]);

	const panes = [
		{
			menuItem: "Зміст замовлення",
			render: () => (
				<Tab.Pane>
					<Grid>
						<Dishes
							dispatch={dispatch}
							dishes={filteredDishes}
							dishesQuantity={orderDishes}
						/>
					</Grid>
				</Tab.Pane>
			),
		},
		{
			menuItem: "Деталі замовлення",
			render: () => (
				<Tab.Pane>
					<Grid>
						<OrderCredentials
							dispatch={dispatch}
							defaultAccount={account.accounts}
							dishes={filteredDishes}
							orderDishes={orderDishes}
							orderQuantity={orderQuantity}
							orderTotalPrice={totalPrice}
						/>
					</Grid>
				</Tab.Pane>
			),
		},
	];

	return (
		<>
			<Header />

			<Grid padded>
				<Grid.Column>
					<Tab panes={panes} />
				</Grid.Column>
			</Grid>
		</>
	);
};

const mapStateToProps = (state) => ({
	account: state.accounts,
	loadingAccount: state.accounts.loading,
	hasErrorsAccount: state.accounts.hasErrors,

	dishes: state.dishes.dishes,
	loadingDishes: state.dishes.loading,
	hasErrorsDishes: state.dishes.hasErrors,

	orderDishes: state.order.dishes,
	orderQuantity: state.order.quantity,
});

export default connect(mapStateToProps)(Order);
