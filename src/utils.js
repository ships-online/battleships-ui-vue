/**
 * Returns optimal size for single cell of the battlefield.
 *
 * @param {Number} size Battleship size.
 * @param {Number} availableWidth Available size for two battlefields.
 * @returns {number}
 */
export function getCellSize( size, availableWidth ) {
	return Math.min( Math.floor( availableWidth / ( ( size * 2 ) + 1 ) ), 45 );
}

/**
 * Add `px` to the given value.
 *
 * @param {*} value
 * @returns {String}
 */
export function toPx( value ) {
	return `${ value }px`;
}

/**
 * Converts Collection to Array and bind this array with collection
 * to be in the same state after adding or removing items.
 *
 * @param {Collection} collection
 * @returns {Array}
 */
export function collectionToArray( collection ) {
	const result = Array.from( collection );

	collection.on( 'add', ( evt, item ) => result.push( item ) );
	collection.on( 'remove', ( evt, item ) => result.splice( result.indexOf( item ), 1 ) );

	return result;
}

/**
 * Returns screen width reduced by a side margin.
 *
 * @returns {Number}
 */
export function getClientWidth() {
	return document.body.clientWidth - 20;
}

/**
 * Settings stored in the browser storage.
 *
 * @private
 */
class Settings {
	/**
	 * @param {LocalStorage} storage
	 */
	constructor( storage ) {
		/**
		 * @private
		 * @type {LocalStorage}
		 */
		this._storage = storage;
	}

	/**
	 * @param {String} key
	 * @param {*} value
	 */
	set( key, value ) {
		const data = this.get();

		data[ key ] = value;

		this._storage.setItem( 'battleships-game', JSON.stringify( data ) );
	}

	/**
	 * Returns data stored behind the given key or the entire data object when key is not defined.
	 *
	 * @param {String} [key]
	 * @returns {*}
	 */
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

/**
 * Instance for stores and gets any data that needs to be stored in the browser storage.
 *
 * @type {Settings}
 */
export const settings = new Settings( window.localStorage );
