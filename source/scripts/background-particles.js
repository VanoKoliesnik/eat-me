const emojies = "🍕🥐🍗🍩🧁☕🍎";

let backgroundWrapper = document.querySelectorAll("#particles-js")[0];
let backgroundItems = backgroundWrapper.children;

backgroundWrapper.innerHTML = "";

let backgroundWrapperWidth = backgroundWrapper.offsetWidth;
let backgroundWrapperHeight = backgroundWrapper.offsetHeight;

let random = {
	_height: backgroundWrapperHeight,
	_width: backgroundWrapperWidth,
	default: (min, max) => {
		return Math.random() * (max - min) + min;
	},
	relativeToHeight: () => {
		return Math.ceil(Math.random() * (random._height + random._height));
	},
	relativeToWidth: () => {
		return Math.ceil(Math.random() * (random._width - 30));
	},
};

function resize() {
	backgroundWrapper = document.querySelectorAll("#particles-js")[0];
	backgroundItems = backgroundWrapper.children;

	backgroundWrapperWidth = backgroundWrapper.offsetWidth;
	backgroundWrapperHeight = backgroundWrapper.offsetHeight;

	random = {
		...random,
		_height: backgroundWrapperHeight,
		_width: backgroundWrapperWidth,
	};
	backgroundWrapper.innerHTML = "";

	[...emojies].forEach(() => {
		generate(4);
	});

	render()
}

function generate(count = 1) {
	while (count > 0) {
		const emojie = [...emojies][
			Math.floor(Math.random() * [...emojies].length)
		];

		const newBackgroundItem = document.createElement("div");

		newBackgroundItem.classList.add("background_item");
		newBackgroundItem.innerHTML = emojie;

		newBackgroundItem.style.top = `${random.relativeToHeight()}px`;
		newBackgroundItem.style.left = `${random.relativeToWidth()}px`;

		backgroundWrapper.appendChild(newBackgroundItem);

		count--;
	}
}

function render() {
	[...backgroundItems].forEach((backgroundItem) => {
		const backgroundItemPosition = backgroundItem.getBoundingClientRect();

		if (backgroundItemPosition.top < -50) {
			backgroundWrapper.removeChild(backgroundItem);
			generate();
		} else {
			const bacgkgroundItemTop = +backgroundItem.style.top.match(
				/(-?\d+(?:\.\d*)?)/gm
			)[0];

			backgroundItem.style.top = `${
				bacgkgroundItemTop - random.default(0, 3)
			}px`;
		}
	});

	requestAnimationFrame(render);
}

[...emojies].forEach(() => {
	generate(4);
});
requestAnimationFrame(render);

window.addEventListener("resize", resize);


// import "particles.js";

// particlesJS("particles-js", {
// 	particles: {
// 		number: {
// 			value: 160,
// 			density: {
// 				enable: true,
// 				value_area: 800,
// 			},
// 		},
// 		color: {
// 			value: "#00a19a",
// 		},
// 		shape: {
// 			type: "triangle",
// 			stroke: {
// 				width: 0,
// 				color: "#000000",
// 			},
// 			polygon: {
// 				nb_sides: 5,
// 			},
// 		},
// 		opacity: {
// 			value: 0.2,
// 			random: true,
// 			anim: {
// 				enable: true,
// 				speed: 1,
// 				opacity_min: 0,
// 				sync: false,
// 			},
// 		},
// 		size: {
// 			value: 10,
// 			random: true,
// 			anim: {
// 				enable: false,
// 				speed: 4,
// 				size_min: 0.3,
// 				sync: false,
// 			},
// 		},
// 		line_linked: {
// 			enable: false,
// 			distance: 50,
// 			color: "#de6666",
// 			opacity: 0.2,
// 			width: 0.6,
// 		},
// 		move: {
// 			enable: true,
// 			speed: 0.5,
// 			direction: "top",
// 			random: true,
// 			straight: true,
// 			out_mode: "out",
// 			bounce: false,
// 			attract: {
// 				enable: false,
// 				rotateX: 600,
// 				rotateY: 600,
// 			},
// 		},
// 	},
// 	interactivity: {
// 		detect_on: "canvas",
// 		events: {
// 			onhover: {
// 				enable: true,
// 				mode: "grab",
// 			},
// 			onclick: {
// 				enable: true,
// 				mode: "push",
// 			},
// 			resize: true,
// 		},
// 		modes: {
// 			grab: {
// 				distance: 300,
// 				line_linked: {
// 					opacity: 1,
// 				},
// 			},
// 			bubble: {
// 				distance: 250,
// 				size: 0,
// 				duration: 2,
// 				opacity: 0,
// 				speed: 3,
// 			},
// 			repulse: {
// 				distance: 400,
// 				duration: 0.4,
// 			},
// 			push: {
// 				particles_nb: 4,
// 			},
// 			remove: {
// 				particles_nb: 2,
// 			},
// 		},
// 	},
// 	retina_detect: false,
// });
