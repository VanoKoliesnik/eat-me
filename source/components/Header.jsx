import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Responsive, Menu, Dropdown, Label } from "semantic-ui-react";

import { setOrderQuantity } from "../actions/orderActions";

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

const MenuItems = ({ items, minWidth, quantity }) => {
	return items.map((item, key) => (
		<Responsive minWidth={minWidth} key={key}>
			<Menu.Item href={item.href}>
				{item.title}
				{item.title === "Замовлення" ? (
					quantity === null ? null : quantity === "" ? null : (
						<Label color="teal" size="mini">
							{quantity}
						</Label>
					)
				) : null}
			</Menu.Item>
		</Responsive>
	));
};
const DropdownItems = ({ items, quantity }) => {
	return items.map((item, key) => (
		<Dropdown.Item href={item.href} key={key} as="a">
			{item.title}
			{item.title === "Замовлення" ? (
				quantity === null ? null : quantity === "" ? null : (
					<Label color="teal" size="mini">
						{quantity}
					</Label>
				)
			) : null}
		</Dropdown.Item>
	));
};

const Header = ({ dispatch, orderQuantity }) => {
	const [logoEmoji] = useState(selectEmoji);
	const [menuItems] = useState([
		{ title: "Головна", href: "/" },
		{ title: "Заклади", href: "/establishments" },
		{ title: "Замовлення", href: "/order" },
		{ title: "Логін", href: "/login" },
		{ title: "Реєстрація", href: "/registration" },
		{ title: "Профіль", href: "/profile" },
	]);
	useEffect(() => {
		dispatch(setOrderQuantity(orderQuantity));
	}, [dispatch]);

	return (
		<Menu fixed="top" fluid borderless>
			<Menu.Item href="/" header>
				{logoEmoji} Eat Me
			</Menu.Item>
			<Menu.Menu position="right">
				<MenuItems items={menuItems} minWidth={630} quantity={orderQuantity} />

				<Responsive maxWidth={630}>
					<Dropdown item icon="bars">
						<Dropdown.Menu>
							<DropdownItems items={menuItems} quantity={orderQuantity} />
						</Dropdown.Menu>
					</Dropdown>
				</Responsive>
			</Menu.Menu>
		</Menu>
	);
};

const mapStateToProps = (state) => ({
	orderQuantity: state.order.quantity,
});

export default connect(mapStateToProps)(Header);
