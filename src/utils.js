import Vue from 'vue';
import Game from 'battleships-ui-vue/src/game.vue';

export function getCellSize( size, clientWidth ) {
	return Math.min( Math.floor( clientWidth / ( ( size * 2 ) + 1 ) ), 40 );
}

export function toPx( value ) {
	return `${ value }px`;
}

export function collectionToArray( collection ) {
	const result = Array.from( collection );

	collection.on( 'add', ( evt, item ) => result.push( item ) );
	collection.on( 'remove', ( evt, item ) => {
		if ( result.includes( item ) ) {
			result.splice( result.indexOf( item ), 1 );
		}
	} );

	return result;
}

export function createGameView( game ) {
	const playerBattlefield = game.player.battlefield;
	const opponentBattlefield = game.opponent.battlefield;

	return new Vue( {
		el: '#game',
		data: {
			size: game.player.battlefield.size,
			player: {
				ships: collectionToArray( playerBattlefield.shipsCollection ),
				fields: collectionToArray( playerBattlefield ),
				rotateShip: ship => playerBattlefield.rotateShip( ship ),
				moveShip: ( ship, position ) => playerBattlefield.moveShip( ship, position )
			},
			opponent: {
				ships: collectionToArray( opponentBattlefield.shipsCollection ),
				fields: collectionToArray( opponentBattlefield ),
				shoot: position => game.shoot( position )
			}
		},
		render: h => h( Game )
	} );
}
