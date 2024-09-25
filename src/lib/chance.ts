import { Chance } from "chance";

const chance = new Chance();

export const randomName = () => {
	const name = chance.name({
		full: false,
		nationality: "en",
	});

	return name.split(" ")[0];
};

export const randomColor = () => {
	return chance.color({
		format: "hex",
	});
};
