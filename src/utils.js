export function getCellSize( size, clientWidth ) {
	return Math.min( Math.floor( clientWidth / ( ( size * 2 ) + 1 ) ), 40 );
}

export function toPx( value ) {
	return `${ value }px`;
}
