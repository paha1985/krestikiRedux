import styles from './field.module.css';
import PropTypes from 'prop-types';

export const Field = ({ appStore, click }) => {
	return <FieldLayout cells={appStore.field} click={click} />;
};

export const FieldLayout = ({ cells, click }) => {
	return (
		<div className={styles['field']}>
			{cells.map((cell, i) => (
				<button key={i} onClick={() => click(i)} className={styles['cell']}>
					{cell}
				</button>
			))}
		</div>
	);
};

Field.propTypes = {
	cells: PropTypes.array,
	click: PropTypes.func,
};
