import { MountainStrip, Goods } from "./types";

function shuffle<T>(array: T[]): T[] {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

const layouts = [
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Ore, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Stone, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Stone, Goods.Ore, Goods.Ore, Goods.DoubleSilver, Goods.DoubleSilver]
]

export default function createStripDeck(): MountainStrip[] {
	return shuffle(layouts.map(layout => ({
		layout,
		taken: 0,
		removed: false
	})))
}