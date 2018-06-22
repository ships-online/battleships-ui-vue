<template>
	<div>
		<div class="menu">
			<v-Button
				:disabled="game.player.isReady"
				:tooltip="game.player.isReady ? 'You have arranged your ships' : ''"
				:tooltip-position="'toLeft'"
				:execute="random">Randomize</v-Button>
			<v-Button
				:disabled="game.player.isReady || !game.player.isInGame || game.player.battlefield.isCollision"
				:tooltip="readyButtonTooltip"
				:execute="ready">Ready</v-Button>
		</div>
		<div
			:style="{ width }"
			class="fields-container">

			<PlayerBattlefield
				v-if="game.status !== 'over'"
				:size="size"
				:cell-size="cellSize"
				:is-active="!game.activePlayerId || game.activePlayerId === game.opponent.id"
				:ships="playerShips"
				:fields="playerFields"
				:rotate-ship="rotateShip"
				:move-ship="moveShip"/>

			<SummaryField
				v-if="game.status === 'over'"
				:size="size"
				:cell-size="cellSize"
				:player="game.player"
				:opponent="game.opponent"
				:is-winner="game.winnerId === game.player.id"
				:rematch="rematch"/>

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
	import SummaryField from './summaryfield.vue';
	import Button from './button.vue';
	import { getCellSize, toPx, collectionToArray } from './utils.js';

	const MARGIN = 20;

	export default {
		components: {
			PlayerBattlefield,
			OpponentBattlefield,
			InviteField,
			SummaryField,
			'v-Button': Button
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
			},

			readyButtonTooltip() {
				if ( this.game.player.isReady ) {
					return 'You are ready';
				} else if ( !this.game.player.isInGame ) {
					return 'Join the game first';
				} else if ( this.game.player.battlefield.isCollision ) {
					return 'Ships configuration is invalid';
				}

				return '';
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
			},

			rematch() {
				this.game.requestRematch();
			}
		}
	};

	function getClientWidth() {
		return document.body.clientWidth - MARGIN;
	}
</script>

<style>
	.battleships {
		color: var( --battleships-font-color );
		font-family: var( --battleships-font-family );
		font-size: var( --battleships-font-size );
		background: var( --battleships-background-color );

		&, * {
			box-sizing: border-box;
		}

		.menu {
			text-align: left;
			padding: 10px 0;
		}

		.wrapper {
			margin: 0 auto;
			display: inline-block;

			.fields-container {
				display: flex;
				justify-content: space-between;
			}
		}

		input {
			font-size: 1em;
			width: 100%;
			padding: 5px;
			border: solid 1px var(--battleships-button-border-color);
			border-radius: var(--battleships-border-radius);
			background: var( --battleships-input-background-color );
			color: var( --battleships-input-color );
		}

		input {
			&[disabled] {
				opacity: 0.5;
			}
		}

		.input-group {
			margin: 0 auto;
			display: flex;
			align-content: space-between;
			max-width: 400px;

			input {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}

			.btn-wrapper {
				.btn {
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
					border-left: 0;
					width: 90px;
				}
			}
		}
	}
</style>
