import * as React from 'react';
import { MountainStrip, Goods } from "./types";
import styled from "styled-components";
import SwipeActions from './SwipeActions';

interface Props {
	strip: MountainStrip
};

function goodToImageSrc(good: Goods): string {
	switch(good) {
		case Goods.Wood:
			return '/wood.png'
		case Goods.Stone:
			return '/stone.png'
		case Goods.Ore:
			return '/ore.png'
		case Goods.DoubleSilver:
			return '/coins.png'
		case Goods.Silver:
			return '/silver.png'
	}
}

const Strip = styled.div`
	margin-bottom: 15px;
	height: 80px;
	background: url('/strip.png');
	background-size: cover;
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
`

const Good = styled.img`
`

export default function MountainStripComponent(props: Props) {
	return (
		<SwipeActions>
			<Strip>
				{props.strip.layout.map(good => (
					<Good src={goodToImageSrc(good)} />
				))}
			</Strip>
		</SwipeActions>
	)
}