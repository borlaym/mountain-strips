export enum Goods {
	Wood,
	Stone,
	Ore,
	Silver,
	DoubleSilver
}

export interface MountainStrip {
	layout: Goods[],
	taken: number
}

