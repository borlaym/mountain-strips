import * as React from 'react';
import './App.css';
import { MountainStrip, NorwegianStrip } from './types';
import MountainStripComponent from './MountainStrip';
import createStripDeck from './createStripDeck';
import styled from 'styled-components';

enum View {
	Main,
	Settings
}

enum PlayerCount {
	OneToThree,
	Four
}

interface State {
	stripDeck: MountainStrip[],
	activeStrips: MountainStrip[],
	view: View,
	settings: NorwegianStrip
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow-x: hidden;
`

const Button = styled.button`
	margin: 15px;
	margin-bottom: 300px;
	padding: 15px;
	width: 70%;
	text-align: center;
	background: rgb(197, 155, 100);
	color: rgb(58, 22, 5);
	outline: none;
	border: none;
	font-weight: bold;
`

const Link = styled.a`
	color: #222222;
	padding: 30px;
`

const NewGameContainer =  styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 30px;
`

const Option = styled.div`
	margin: 0 20px;
	border: 1px solid black;
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: calc(100% - 40px);
	box-sizing: border-box;

	${(props: { selected: boolean }) => props.selected && 'background: rgb(197, 155, 100);'}
`

const OptionSelect = styled.div`
	margin-top: 30px;
`

const Info = styled.p`
	margin: 20px;
	text-align: center;
	margin-bottom: 50px;

`

class App extends React.Component<{}, State> {
	public state: State = {
		stripDeck: [],
		activeStrips: [],
		view: View.Main,
		settings: NorwegianStrip.DontUse
	}
	private newGame = (playerCount: PlayerCount) => {
		const stripDeck = createStripDeck(this.state.settings);
		switch (playerCount) {
			case PlayerCount.OneToThree: {
				const [strip1, strip2, ...rest] = stripDeck
				this.setState({
					activeStrips: [strip1, strip2],
					stripDeck: rest
				})
				return
			}
			case PlayerCount.Four: {
				const [strip1, strip2, strip3, ...rest] = stripDeck
				this.setState({
					activeStrips: [strip1, strip2, strip3],
					stripDeck: rest
				})
				return
			}

		}
	}
	componentDidUpdate() {
		window.localStorage.setItem('state', JSON.stringify(this.state))
	}
	componentDidMount() {
		const prevState = window.localStorage.getItem('state');
		if (prevState) {
			try {
				const state = JSON.parse(prevState);
				this.setState(state);
			} catch (err) {
				console.error(err)
			}
		}
	}
	take = (index: number) => {
		const newTakenNumber = Math.min(this.state.activeStrips[index].layout.length, this.state.activeStrips[index].taken + 1)
		this.setState({
			activeStrips: [
				...this.state.activeStrips.slice(0, index),
				{
					layout: this.state.activeStrips[index].layout,
					taken: newTakenNumber,
					removed: this.state.activeStrips[index].removed
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
					taken: newTakenNumber,
					removed: this.state.activeStrips[index].removed
				},
				...this.state.activeStrips.slice(index + 1)
			]
		})
	}
	nextTurn = () => {
		const newStrip = this.state.stripDeck[0]
		const updatedStrips = this.state.activeStrips.map(strip => ({
			layout: strip.layout,
			taken: Math.min(strip.taken + 1, strip.layout.length),
			removed: Math.min(strip.taken + 1, strip.layout.length) === strip.layout.length
		}))
		this.setState({
			activeStrips: newStrip ? updatedStrips.concat(newStrip) : updatedStrips,
			stripDeck: this.state.stripDeck.slice(1)
		})
	}
	showSettings = () => {
		this.setState({ view: View.Settings })
	}
	back = () => {
		this.setState({ view: View.Main })
	}
	setNorwegians = (settings: NorwegianStrip) => {
		this.setState({ settings })
	}
	renderSettings = () => {
		return (
			<Container>
				<OptionSelect>
					<Option selected={this.state.settings === NorwegianStrip.DontUse} onClick={() => this.setNorwegians(NorwegianStrip.DontUse)}>Don't use Norwegians strip</Option>
					<Option selected={this.state.settings === NorwegianStrip.Random} onClick={() => this.setNorwegians(NorwegianStrip.Random)}>Shuffle the Norwegians strip in</Option>
					<Option selected={this.state.settings === NorwegianStrip.Last} onClick={() => this.setNorwegians(NorwegianStrip.Last)}>The Norwegians strip will always be the last one</Option>
					<Option selected={this.state.settings === NorwegianStrip.RandomCustom} onClick={() => this.setNorwegians(NorwegianStrip.RandomCustom)}>Shuffle the custom Norwegians strip in as intended by the designer</Option>
					<Info>Find out more in <a target="_blank" href="https://boardgamegeek.com/thread/2084644/new-mountain-stripe-2-4-players-only">this BoardGameGeek post</a></Info>
				</OptionSelect>
				<Link onClick={this.back}>Back</Link>
			</Container>
		)
	}
	render() {
		if (this.state.view === View.Settings) {
			return this.renderSettings()
		}
		return (
			<Container>
				{this.state.activeStrips.map((strip, index) => (
					<MountainStripComponent
						key={strip.layout.join('')}
						strip={strip}
						onTakeAction={() => this.take(index)}
						onUndoAction={() => this.undo(index)}
					/>
				))}
				{this.state.stripDeck.length > 0 && <Button onClick={this.nextTurn}>End of Turn</Button>}
				<NewGameContainer>
					<Link onClick={() => this.newGame(PlayerCount.OneToThree)}>New Game</Link>
					<Link onClick={() => this.newGame(PlayerCount.Four)}>New 4p Game</Link>
				</NewGameContainer>
				<Link onClick={this.showSettings}>Settings</Link>
			</Container>
		)
	}
}

export default App;
