import styles from './information.module.css';
import React from 'react';
import PropTypes from 'prop-types';

//const { currentPlayer, isGameOver, isDraw } = store.getState();

//export const Information = (props) => {
export const Information = (props) => {
	return (
		<InformationLayout
			player={props.appStore.currentPlayer}
			gameOver={props.appStore.isGameEnded}
			draw={props.appStore.isDraw}
			// player={currentPlayer}
			// gameOver={isGameOver}
			// draw={isDraw}
		/>
	);
};

export const InformationLayout = ({ player, gameOver, draw }) => {
	return (
		<div className={styles['info']}>
			{gameOver
				? 'Победил игрок ' + (player === 'X' ? 'O' : 'X')
				: draw
					? 'Ничья'
					: 'Ход игрока ' + (player === 'X' ? 'X' : 'O')}
		</div>
	);
};

Information.propTypes = {
	player: PropTypes.string,
	gameOver: PropTypes.bool,
	draw: PropTypes.bool,
};
