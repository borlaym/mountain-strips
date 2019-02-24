import { MountainStrip, Goods, NorwegianStrip } from "./types";

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

function createNewStrip(layout: Goods[]): MountainStrip {
	return {
		layout,
		taken: 0,
		removed: false
	}
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

const norwegianLayoutCustom =
	[Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.Silver, Goods.Silver, Goods.DoubleOre]

const norwegianLayout =
	[Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver, Goods.DoubleSilver, Goods.DoubleOre]



export default function createStripDeck(config: NorwegianStrip): MountainStrip[] {
	switch (config) {
		case NorwegianStrip.DontUse:
			return shuffle(layouts.map(createNewStrip))
		case NorwegianStrip.Random:
			return shuffle(layouts.concat([norwegianLayout]).map(createNewStrip))
		case NorwegianStrip.Last:
			return shuffle(layouts.map(createNewStrip)).concat(createNewStrip(norwegianLayout))
		case NorwegianStrip.RandomCustom:
			return shuffle(layouts.concat([norwegianLayoutCustom]).map(createNewStrip))
	}
	
}