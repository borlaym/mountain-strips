export enum Goods {
	Wood,
	Stone,
	Ore,
	Silver,
	DoubleSilver,
	DoubleOre
}

export interface MountainStrip {
	layout: Goods[],
	taken: number,
	removed: boolean
}

export enum NorwegianStrip {
	DontUse, // Do not use the expansion strip
	Random, // Shuffle it in with the other strips
	Last, // It will be the last one always
	RandomCustom // Shuffle it in the way the designer intended, with single coins
}
