import * as React from 'react';
import { MountainStrip, Goods } from "./types";
import styled from "styled-components";
import SwipeActions from './SwipeActions';
import wood from './images/wood.png';
import stone from './images/stone.png';
import ore from './images/ore.png';
import silvers from './images/silvers.png';
import silver from './images/silver.png';
import strip from './images/strip.png';
import ores from './images/ores.png';

interface Props {
	strip: MountainStrip,
	onTakeAction: () => void,
	onUndoAction: () => void
};

function goodToImageSrc(good: Goods): string {
	switch(good) {
		case Goods.Wood:
			return wood
		case Goods.Stone:
			return stone
		case Goods.Ore:
			return ore
		case Goods.DoubleSilver:
			return silvers
		case Goods.Silver:
			return silver
		case Goods.DoubleOre:
			return ores;
	}
}

const Strip = styled.div`
	/* margin-bottom: 15px; */
	height: ${(props: { removed: boolean }) => props.removed ? '0px' : '80px'};
	background: url(${strip});
	background-size: fixed;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	transition: all 1s;

	${(props: { removed: boolean }) => props.removed && `
		img {
			opacity: 0;
		}
	`};

`

const Good = styled.img`
	opacity: ${(props: { taken: boolean }) => props.taken ? '0.3' : '1'};
	transition: all 0.8s;
`

export default function MountainStripComponent(props: Props) {
	return (
		<SwipeActions onLeftAction={props.onUndoAction} onRightAction={props.onTakeAction}>
			<Strip removed={props.strip.removed}>
				{props.strip.layout.map((good, index) => (
					<Good key={index} src={goodToImageSrc(good)} taken={props.strip.taken > index} />
				))}
			</Strip>
		</SwipeActions>
	)
}