<template>
	<div class="battleships">
		<div class="battleships-menu">
			<button
				:disabled="game.player.isReady"
				@click="random">Randomize</button>
			<button
				:disabled="game.player.isReady || !game.player.isInGame"
				@click="ready">Ready</button>
		</div>
		<div
			:style="{ width }"
			class="fields-container">
			<PlayerBattlefield
				:size="size"
				:cell-size="cellSize"
				:is-active="game.activePlayerId === game.opponent.id"
				:ships="playerShips"
				:fields="playerFields"
				:rotate-ship="rotateShip"
				:move-ship="moveShip"/>

			<OpponentBattlefield
				v-if="game.opponent.isReady && game.player.isReady"
				:size="size"
				:cell-size="cellSize"
				:is-active="game.activePlayerId === game.player.id"
				:ships="opponentShips"
				:fields="opponentFields"
				:shoot="shoot"/>

			<InviteField
				v-if="!game.opponent.isReady || !game.player.isReady"
				:size="size"
				:cell-size="cellSize"
				:invite-url="game.inviteUrl"
				:interested-players-number="game.interestedPlayersNumber"
				:player="game.player"
				:opponent="game.opponent"
				:join="join"
				:ready="ready"/>
		</div>
	</div>
</template>

<script>
	import PlayerBattlefield from './playerbattlefield.vue';
	import OpponentBattlefield from './opponentbattlefield.vue';
	import InviteField from './invitefield.vue';
	import { getCellSize, toPx, collectionToArray } from './utils.js';

	const MARGIN = 20;

	export default {
		components: {
			PlayerBattlefield,
			OpponentBattlefield,
			InviteField
		},

		data() {
			const game = this.$parent.game;

			return {
				clientWidth: getClientWidth(),
				playerShips: collectionToArray( game.player.battlefield.shipsCollection ),
				playerFields: collectionToArray( game.player.battlefield ),
				opponentShips: collectionToArray( game.opponent.battlefield.shipsCollection ),
				opponentFields: collectionToArray( game.opponent.battlefield ),
				size: game.player.battlefield.size,
				game
			};
		},

		computed: {
			cellSize() {
				return getCellSize( this.size, this.clientWidth );
			},

			width() {
				return toPx( ( this.cellSize * this.size ) * 2 + this.cellSize );
			}
		},

		mounted() {
			window.addEventListener( 'resize', () => ( this.clientWidth = getClientWidth() ) );
		},

		methods: {
			moveShip( ship, position ) {
				this.game.player.battlefield.moveShip( ship, position );
			},

			rotateShip( ship ) {
				this.game.player.battlefield.rotateShip( ship );
			},

			shoot( position ) {
				this.game.shoot( position );
			},

			join() {
				this.game.accept();
			},

			ready() {
				this.game.ready();
			},

			random() {
				this.game.player.battlefield.random();
			}
		}
	};

	function getClientWidth() {
		return document.body.clientWidth - MARGIN;
	}
</script>
