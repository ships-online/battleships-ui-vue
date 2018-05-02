export function getCellSize( size ) {
	return Math.min( Math.floor( document.body.clientWidth / size ), 40 );
}

export function toPx( value ) {
	return `${ value }px`;
}
