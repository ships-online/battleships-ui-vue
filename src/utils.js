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

class Settings {
	constructor( storage ) {
		this._storage = storage;
	}

	set( key, value ) {
		const data = this.get();

		data[ key ] = value;

		this._storage.setItem( 'battleships-game', JSON.stringify( data ) );
	}

	get( key ) {
		let data = this._storage.getItem( 'battleships-game' );

		if ( data ) {
			data = JSON.parse( data );
		} else {
			data = {};
		}

		if ( key ) {
			return data[ key ];
		}

		return data;
	}
}

export const settings = new Settings( window.localStorage );
