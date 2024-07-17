import styles from './app.module.css';
import { useState } from 'react';
import { Field } from './field';
import { Information } from './information';
import PropTypes from 'prop-types';
import { store } from './store';

export const App = () => {
	// const [currentPlayer, setCurrentPlayer] = useState('X');
	// const [isGameEnded, setIsGameEnded] = useState(false);
	// const [isDraw, setIsDraw] = useState(false);
	const [field1, setField] = useState(Array(9).fill(null));
	// const [counter, setCounter] = useState(0);

	function krestik(cells) {
		const WIN_PATTERNS = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			const [a, b, c] = WIN_PATTERNS[i];
			if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
				//setIsGameEnded(true);
				store.dispatch({ type: 'GAMEOVER', payload: true });
				console.log(store.getState());
			}
		}
		return null;
	}

	const cellClick = (index) => {
		let { currentPlayer, isGameEnded, isDraw, field, counter } = store.getState();
		console.log(field);
		const fieldCopy = [...field];
		if (isGameEnded || isDraw || fieldCopy[index]) return;
		fieldCopy[index] = currentPlayer;

		currentPlayer === 'X' ? (currentPlayer = 'O') : (currentPlayer = 'X'); //setCurrentPlayer('O') : setCurrentPlayer('X');
		store.dispatch({
			type: 'CELL_CLICK',
			payload: {
				currentPlayer: currentPlayer,
				isGameEnded: isGameEnded,
				isDraw: isDraw,
				field: fieldCopy,
				counter: counter + 1,
			},
		});
		console.log(store.getState());

		krestik(fieldCopy);
		setField(fieldCopy);
		//setCounter(counter + 1);

		if (counter === 8) {
			//setIsDraw(true);
			store.dispatch({ type: 'DRAW', payload: true });
			console.log(store.getState());
			console.log(isDraw);
		}
	};

	function clear() {
		// setCurrentPlayer('X');
		// setIsGameEnded(false);
		// setIsDraw(false);
		setField(Array(9).fill(null));
		// setCounter(0);
		store.dispatch({ type: 'CLEAR', payload: '' });
	}

	return <AppLayout appStore={store.getState()} clear={clear} cellClick={cellClick} />;
};

export const AppLayout = ({ appStore, clear, cellClick }) => {
	return (
		<div className={styles['wrapper']}>
			<Information appStore={appStore} />
			<Field appStore={appStore} click={cellClick} />
			<button className={styles['newGame']} onClick={() => clear()}>
				Начать заново
			</button>
		</div>
	);
};

AppLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isGameEnded: PropTypes.bool,
	isDraw: PropTypes.bool,
	clear: PropTypes.func,
	field: PropTypes.array,
	cellClick: PropTypes.func,
};
