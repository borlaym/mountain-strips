import * as React from 'react';
import Hammer from 'react-hammerjs'
import styled from 'styled-components';

const MAX_DRAG_DISTANCE = 100

interface Props {
	children: React.ReactNode
}

interface State {
	swiping: boolean,
	x: number
}

const Container = styled.div`
	position: relative;
	${(props: { swiping: boolean }) => props.swiping ? '' : 'transition: all 0.5s' }
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
		this.setState({ x: 0, swiping: false })
	}

	render() {
		return (
			<Hammer onPan={this.handlePan} onPanEnd={this.handlePanEnd}>
				<Container style={{ left: this.state.x + 'px' }} swiping={this.state.swiping}>
					{this.props.children}
				</Container>
			</Hammer>
		)
	}
}