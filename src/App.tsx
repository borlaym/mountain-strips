import * as React from 'react';
import './App.css';
import { MountainStrip } from './types';
import MountainStripComponent from './MountainStrip';
import createStripDeck from './createStripDeck';
import styled from 'styled-components';

interface State {
	stripDeck: MountainStrip[],
	activeStrips: MountainStrip[]
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow-x: hidden;
`

const Button = styled.button`
	display: flex;
	margin: 15px;
	padding: 15px;
	text-align: center;
	background: green;
	color: white;
`

class App extends React.Component<{}, State> {
	public state: State = {
		stripDeck: createStripDeck(),
		activeStrips: []
	}
	private newGame = () => {
		const [strip1, strip2, ...rest] = this.state.stripDeck
		this.setState({
			activeStrips: [strip1, strip2],
			stripDeck: rest
		})
	}
	componentDidMount() {
		this.newGame()
	}
	take = (index: number) => {
		const newTakenNumber = Math.min(this.state.activeStrips[index].layout.length, this.state.activeStrips[index].taken + 1)
		this.setState({
			activeStrips: [
				...this.state.activeStrips.slice(0, index),
				{
					layout: this.state.activeStrips[index].layout,
					taken: newTakenNumber
				},
				...this.state.activeStrips.slice(index + 1)
			]
		})
	}
	undo = (index: number) => {
		const newTakenNumber = Math.max(0, this.state.activeStrips[index].taken - 1)
		this.setState({
			activeStrips: [
				...this.state.activeStrips.slice(0, index),
				{
					layout: this.state.activeStrips[index].layout,
					taken: newTakenNumber
				},
				...this.state.activeStrips.slice(index + 1)
			]
		})
	}
	render() {
		console.log(this.state);
		return (
			<Container>
				{this.state.activeStrips.map((strip, index) => (
					<MountainStripComponent
						strip={strip}
						onTakeAction={() => this.take(index)}
						onUndoAction={() => this.undo(index)}
					/>
				))}
				<Button onClick={this.newGame}>New Game</Button>
			</Container>
		)
	}
}

export default App;
