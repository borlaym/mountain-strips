import * as React from 'react';
import { MountainStrip } from "./types";
import styled from "styled-components";

interface Props {
	strip: MountainStrip
};

const Strip = styled.div`
	padding: 10px;
	height: 60px;
	background: url('/strip.png');
	display: flex;
`

export default function MountainStripComponent(props: Props) {
	return (
		<div>
			<Strip />
		</div>
	)
}