import React from "react";

import { Dropdown, Grid } from "semantic-ui-react";

const OrderFilter = ({
	paidValue,
	deliveredValue,
	paymentMethodValue,
	handleDropdown,
}) => {
	const [paidOptions] = React.useState([
		{
			key: "default",
			text: "Оплата",
			value: "default",
		},
		{
			key: "paid",
			text: "Оплачено",
			value: true,
		},
		{
			key: "!paid",
			text: "Не оплачено",
			value: false,
		},
	]);
	const [deliveredOptions] = React.useState([
		{
			key: "default",
			text: "Доставка",
			value: "default",
		},
		{
			key: "delivered",
			text: "Доставлено",
			value: true,
		},
		{
			key: "!delivered",
			text: "Не доставлено",
			value: false,
		},
	]);
	const [paymentMethodOptions] = React.useState([
		{
			key: "default",
			text: "Метод оплати",
			value: "default",
		},
		{
			key: "cash",
			text: "Готівкова",
			value: "cash",
		},
		{
			key: "cashless",
			text: "Безготівкова",
			value: "cashless",
		},
	]);

	return (
		<Grid stackable columns={3}>
			<Grid.Column>
				<Dropdown
					placeholder="Оплата"
					fluid
					selection
					name="paid"
					value={paidValue}
					onChange={handleDropdown}
					options={paidOptions}
				/>
			</Grid.Column>
			<Grid.Column>
				<Dropdown
					placeholder="Доставка"
					fluid
					selection
					name="delivered"
					value={deliveredValue}
					onChange={handleDropdown}
					options={deliveredOptions}
				/>
			</Grid.Column>
			<Grid.Column>
				<Dropdown
					placeholder="Метод оплати"
					fluid
					selection
					name="paymentMethod"
					value={paymentMethodValue}
					onChange={handleDropdown}
					options={paymentMethodOptions}
				/>
			</Grid.Column>
		</Grid>
	);
};

export default OrderFilter;
