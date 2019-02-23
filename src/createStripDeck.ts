import { MountainStrip, Goods } from "./types";

const layouts = [
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver],
	[Goods.Wood, Goods.Wood, Goods.Wood, Goods.Stone, Goods.Stone, Goods.Ore, Goods.DoubleSilver]
]

export default function createStripDeck(): MountainStrip[] {
	return layouts.map(layout => ({
		layout,
		taken: 0
	}))
}