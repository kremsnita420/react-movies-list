import GridLoader from 'react-spinners/GridLoader';

const override = {
	display: 'block',
};

function Loader(loadingState) {
	return (
		<div className='grid-loader'>
			<GridLoader
				color='var(--color-primary)'
				loading={loadingState}
				cssOverride={override}
				size={20}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>
		</div>
	);
}

export default Loader;
