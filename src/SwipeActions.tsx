import * as React from 'react';
import Hammer from 'react-hammerjs'
import styled from 'styled-components';

const MAX_DRAG_DISTANCE = 100
const MIN_DISTANCE_FOR_ACTION = 90

interface Props {
	children: React.ReactNode,
	onLeftAction: () => void,
	onRightAction: () => void
}

interface State {
	swiping: boolean,
	x: number
}

const Container = styled.div`
	position: relative;
	width: 100%; 
	${(props: { swiping: boolean }) => props.swiping ? '' : 'transition: all 0.5s' }
	display: flex;
	flex-direction: column;
`

const Left = styled.div`
	width: ${MAX_DRAG_DISTANCE}px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: -${MAX_DRAG_DISTANCE}px;
	height: 80px;
`

const Right = styled(Left)`
	left: auto;
	right: -${MAX_DRAG_DISTANCE}px;
`



export default class SwipeActions extends React.Component<Props, State> {
	state = {
		swiping: false,
		x: 0
	}

	handlePan = (e: HammerInput) => {
		const dragDistance = e.deltaX < 0 ? Math.max(e.deltaX, -MAX_DRAG_DISTANCE) : Math.min(e.deltaX, MAX_DRAG_DISTANCE)
		this.setState({ x: dragDistance , swiping: true })
	}

	handlePanEnd = (e: HammerInput) => {
		if (this.state.x < -MIN_DISTANCE_FOR_ACTION) {
			this.props.onRightAction()
		}
		if (this.state.x > MIN_DISTANCE_FOR_ACTION) {
			this.props.onLeftAction()
		}
		this.setState({ x: 0, swiping: false })
	}

	render() {
		return (
			<Hammer onPan={this.handlePan} onPanEnd={this.handlePanEnd} onTap={this.props.onRightAction}>
				<Container style={{ left: this.state.x + 'px' }} swiping={this.state.swiping}>
					<Left>
						Undo
					</Left>
					{this.props.children}
					<Right>
						Take
					</Right>
				</Container>
			</Hammer>
		)
	}
}