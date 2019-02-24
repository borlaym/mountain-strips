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
	render() {
		return (
			<Container>
				{this.state.activeStrips.map(strip => <MountainStripComponent strip={strip} />)}
				<Button onClick={this.newGame}>New Game</Button>
			</Container>
		)
	}
}

export default App;
