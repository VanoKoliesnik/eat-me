import React from "react";

import { Card, List } from "semantic-ui-react";

const OrdersList = ({
	orders,
	paidValue,
	deliveredValue,
	paymentMethodValue,
}) => {
	return (
		<>
			<Card.Group doubling itemsPerRow={2} stackable>
				{orders
					.filter((order) => {
						const paidDefault = paidValue === "default";
						const deliveredDefault = deliveredValue === "default";
						const paymentMethodDefault = paymentMethodValue === "default";

						const paidValid = paidValue === order.paid;
						const deliveredValid = deliveredValue === order.delivered;
						const paymentMethodValid =
							paymentMethodValue === order.paymentMethod;

						if (paidDefault && deliveredDefault && paymentMethodDefault)
							return true;
						if (paidValid && deliveredValid && paymentMethodValid) return true;

						if (paidDefault && deliveredDefault && paymentMethodValid)
							return true;
						if (paidDefault && deliveredValid && paymentMethodDefault)
							return true;
						if (paidValid && deliveredDefault && paymentMethodDefault)
							return true;

						if (paidDefault && deliveredValid && paymentMethodValid)
							return true;
						if (paidValid && deliveredValid && paymentMethodDefault)
							return true;
						if (paidValid && deliveredDefault && paymentMethodValid)
							return true;

						return false;
					})
					.map((order) => {
						return (
							<Card fluid key={order.id}>
								<Card.Header style={{ padding: 15 }}>
									Номер замовлення: {order.id}
								</Card.Header>

								<Card.Content>
									<List>
										<List.Item>Ім'я: {order.name}</List.Item>
										<List.Item>Прізвище: {order.surname}</List.Item>
										<List.Item>Телефон: {order.customerPhone}</List.Item>
										<List.Item>
											Спосіб оплати:{" "}
											{order.paymentMethod === "cash"
												? "Оплата готівкова кур'єру"
												: order.paymentMethod === "cashless"
												? "Оплата безготівкова кур'єру"
												: "Оплата онлайн"}
										</List.Item>
										{order.orderDetail ? (
											<List.Item>Коментар: {order.orderDetail}</List.Item>
										) : null}
										<List.Item>
											Зміст:
											<List.List>
												{JSON.parse(order.orderListTextField).map(
													(orderListItem) => (
														<List.Item
															key={orderListItem.id}
															style={{
																display: "flex",
																flexDirection: "row",
																justifyContent: "space-between",
															}}
														>
															<span>{orderListItem.name}</span>
															<span>Кіл-ть: {orderListItem.quantity}</span>
														</List.Item>
													)
												)}
											</List.List>
										</List.Item>
										<List.Item>Кіл-ть страв: {order.totalQuantity}</List.Item>
										<List.Item>Сума: {order.totalPrice}</List.Item>
										<List.Item
											style={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<span>{order.paid ? "Оплачено" : "Не оплачено"}</span>
											<span>
												{order.delivered ? "Доставлено" : "Не доставлено"}
											</span>
										</List.Item>
									</List>
								</Card.Content>
							</Card>
						);
					})}
			</Card.Group>
		</>
	);
};

export default OrdersList;
