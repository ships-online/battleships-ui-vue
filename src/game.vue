<template>
	<div class="battleships">
		<div
			:style="{ width }"
			class="fields-container">

			<PlayerBattlefield
				:size="size"
				:cell-size="cellSize"
				:ships="playerShips"
				:fields="playerFields"
				:rotate-ship="rotateShip"
				:move-ship="moveShip"/>

			<OpponentBattlefield
				v-if="game.opponent.isReady"
				:size="size"
				:cell-size="cellSize"
				:ships="opponentShips"
				:fields="opponentFields"
				:shoot="shoot"/>

			<InviteField
				v-if="!game.opponent.isReady"
				:size="size"
				:cell-size="cellSize"
				:invite-url="game.inviteUrl"
				:interested-players-number="game.interestedPlayersNumber"
				:is-host="game.player.isHost"/>
		</div>
	</div>
</template>

<script>
	import PlayerBattlefield from './playerbattlefield.vue';
	import OpponentBattlefield from './opponentbattlefield.vue';
	import InviteField from './invitefield.vue';
	import { getCellSize, toPx, collectionToArray } from './utils.js';

	export default {
		components: {
			PlayerBattlefield,
			OpponentBattlefield,
			InviteField
		},

		data() {
			const game = this.$parent.game;

			return {
				clientWidth: document.body.clientWidth,
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
			window.addEventListener( 'resize', () => ( this.clientWidth = document.body.clientWidth ) );
		},

		methods: {
			moveShip( ship, position ) {
				this.game.player.battlefield.moveShip( ship, position );
			},

			rotateShip( ship ) {
				this.game.player.battlefield.rotateShip( ship );
			},

			shoot( position ) {
				this.game.opponent.battlefield.shoot( position );
			}
		}
	};
</script>
