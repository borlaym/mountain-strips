import * as React from 'react';
import './App.css';
import { MountainStrip } from './types';
import MountainStripComponent from './MountainStrip';
import createStripDeck from './createStripDeck';

interface State {
	stripDeck: MountainStrip[],
	activeStrips: MountainStrip[]
}

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
	render() {
		return (
			<div>
				{this.state.activeStrips.map(strip => <MountainStripComponent strip={strip} />)}
				<button onClick={this.newGame}>New Game</button>
			</div>
		)
	}
}

export default App;
