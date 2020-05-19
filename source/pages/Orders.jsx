import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getAccountId } from "../actions/accountIdActions";
import { fetchOrders } from "../actions/fetchedActions/ordersActions";

import { Grid } from "semantic-ui-react";

import Header from "../components/Header";
import OrderFilter from "../components/OrderFilter";
import OrdersList from "../components/OrdersList";

const Orders = ({ dispatch, orders, accountId }) => {
	const [paidValue, setPaidValue] = useState("default");
	const [deliveredValue, setDeliveredValue] = useState("default");
	const [paymentMethodValue, setPaymentMethodValue] = useState("default");

	useEffect(() => {
		dispatch(getAccountId());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchOrders(accountId));
	}, [accountId]);

	const handleDropdown = (e, d) => {
		switch (d.name) {
			case "paid":
				setPaidValue(d.value);
				break;
			case "delivered":
				setDeliveredValue(d.value);
				break;
			case "paymentMethod":
				setPaymentMethodValue(d.value);
				break;
			default:
				setPaidValue("default");
				setDeliveredValue("default");
				setPaymentMethodValue("default");
		}
	};

	return (
		<>
			<Header />

			<Grid centered stackable padded>
				<Grid.Column width={16}>
					<OrderFilter
						paidValue={paidValue}
						deliveredValue={deliveredValue}
						paymentMethodValue={paymentMethodValue}
						handleDropdown={handleDropdown}
					/>
				</Grid.Column>

				<Grid.Column width={16}>
					<OrdersList
						orders={orders}
						paidValue={paidValue}
						deliveredValue={deliveredValue}
						paymentMethodValue={paymentMethodValue}
					/>
				</Grid.Column>
			</Grid>
		</>
	);
};

const mapStateToProps = (state) => ({
	accountId: state.accountId.id,
	orders: state.orders.orders,
});

export default connect(mapStateToProps)(Orders);
