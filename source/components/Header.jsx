import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Responsive, Menu, Dropdown, Label } from "semantic-ui-react";

import { setOrderQuantity } from "../actions/orderActions";
import { getAccountId } from "../actions/accountIdActions";

const emojis = [
	"😉",
	"🧐",
	"👽",
	"🐇",
	"🐧",
	"🍕",
	"🍔",
	"🍟",
	"🌭",
	"🥐",
	"🥞",
	"🥗",
	"🥪",
	"🌮",
	"🥨",
	"🥟",
	"🍗",
	"🍣",
	"🍤",
	"🍲",
	"🥧",
	"🍩",
	"🍌",
	"🍉",
	"🍎",
	"🥕",
	"❤",
];

const selectEmoji = emojis[Math.floor(Math.random() * emojis.length)];

const MenuItems = ({ items, minWidth, quantity, accountId }) => {
	return items.map((item, key) => {
		if (item.title === "Профіль") {
			if (accountId !== null) {
				return (
					<Responsive minWidth={minWidth} key={key}>
						<Menu.Item href={item.href}>{item.title}</Menu.Item>
					</Responsive>
				);
			}
		} else if (item.title === "Логін" || item.title === "Реєстрація") {
			if (accountId === null) {
				return (
					<Responsive minWidth={minWidth} key={key}>
						<Menu.Item href={item.href}>{item.title}</Menu.Item>
					</Responsive>
				);
			}
		} else {
			return (
				<Responsive minWidth={minWidth} key={key}>
					<Menu.Item href={item.href}>
						{item.title}
						{item.title === "Замовлення" ? (
							quantity === null ? null : quantity === 0 ? null : (
								<Label color="teal" size="mini">
									{quantity}
								</Label>
							)
						) : null}
					</Menu.Item>
				</Responsive>
			);
		}
	});
};
const DropdownItems = ({ items, quantity, accountId }) => {
	return items.map((item, key) => {
		if (item.title === "Профіль") {
			if (accountId !== null) {
				return (
					<Dropdown.Item href={item.href} key={key} as="a">
						{item.title}
					</Dropdown.Item>
				);
			}
		} else if (item.title === "Логін" || item.title === "Реєстрація") {
			if (accountId === null) {
				return (
					<Dropdown.Item href={item.href} key={key} as="a">
						{item.title}
					</Dropdown.Item>
				);
			}
		} else {
			return (
				<Dropdown.Item href={item.href} key={key} as="a">
					{item.title}
					{item.title === "Замовлення" ? (
						quantity === null ? null : quantity === 0 ? null : (
							<Label color="teal" size="mini">
								{quantity}
							</Label>
						)
					) : null}
				</Dropdown.Item>
			);
		}
	});
};

const Header = ({ dispatch, orderQuantity, accountId }) => {
	const [logoEmoji] = useState(selectEmoji);
	const [menuItems] = useState([
		{ title: "Головна", href: "/" },
		{ title: "Замовлення", href: "/order" },
		{ title: "Логін", href: "/login" },
		{ title: "Реєстрація", href: "/registration" },
		{ title: "Профіль", href: "/profile" },
	]);

	useEffect(() => {
		dispatch(setOrderQuantity(orderQuantity));
		dispatch(getAccountId());
	}, [dispatch]);

	return (
		<Menu fixed="top" fluid borderless>
			<Menu.Item href="/" header>
				{logoEmoji} Eat Me
			</Menu.Item>
			<Menu.Menu position="right">
				<MenuItems
					items={menuItems}
					minWidth={630}
					quantity={orderQuantity}
					accountId={accountId}
				/>

				<Responsive maxWidth={630}>
					<Dropdown item icon="bars">
						<Dropdown.Menu>
							<DropdownItems
								items={menuItems}
								quantity={orderQuantity}
								accountId={accountId}
							/>
						</Dropdown.Menu>
					</Dropdown>
				</Responsive>
			</Menu.Menu>
		</Menu>
	);
};

const mapStateToProps = (state) => ({
	orderQuantity: state.order.quantity,
	accountId: state.accountId.id,
});

export default connect(mapStateToProps)(Header);
