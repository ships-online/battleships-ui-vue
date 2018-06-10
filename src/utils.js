export function getCellSize( size, clientWidth ) {
	return Math.min( Math.floor( clientWidth / ( ( size * 2 ) + 1 ) ), 40 );
}

export function toPx( value ) {
	return `${ value }px`;
}

export function collectionToArray( collection ) {
	const result = Array.from( collection );

	collection.on( 'add', ( evt, item ) => result.push( item ) );
	collection.on( 'remove', ( evt, item ) => result.splice( result.indexOf( item ), 1 ) );

	return result;
}
