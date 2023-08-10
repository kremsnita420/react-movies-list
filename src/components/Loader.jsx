import ClipLoader from 'react-spinners/ClipLoader';

const override = {
	display: 'block',
};

function Loader(loadingState) {
	return (
		<div className='grid-loader'>
			<ClipLoader
				color='var(--color-primary)'
				loading={loadingState}
				cssOverride={override}
				size={60}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>
		</div>
	);
}

export default Loader;
