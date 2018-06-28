<template>
	<div :class="gameStateClass">
		<Game-menu
			:game="game"
			:on-settings-change="onSettingsChange"/>

		<div
			:style="{ width }"
			class="fields-container">

			<PlayerBattlefield
				v-if="game.status !== 'over'"
				:size="size"
				:cell-size="cellSize"
				:is-active="isPlayerActive"
				:ships="playerShips"
				:fields="playerFields"
				:rotate-ship="ship => game.player.battlefield.rotateShip( ship )"
				:move-ship="( ship, position ) => game.player.battlefield.moveShip( ship, position )"/>

			<SummaryField
				v-if="game.status === 'over'"
				:size="size"
				:cell-size="cellSize"
				:player="game.player"
				:opponent="game.opponent"
				:is-winner="game.winnerId === game.player.id"
				:rematch="() => game.requestRematch()"/>

			<OpponentBattlefield
				v-if="game.opponent.isReady && game.player.isReady"
				:size="size"
				:cell-size="cellSize"
				:is-active="isOpponentActive"
				:is-shot-enabled="isShotEnabled"
				:ships="opponentShips"
				:fields="opponentFields"
				:shot="position => game.shot( position )"/>

			<InviteField
				v-if="!game.opponent.isReady || !game.player.isReady"
				:size="size"
				:cell-size="cellSize"
				:invite-url="game.inviteUrl"
				:guests-number="game.guestsNumber"
				:player="game.player"
				:opponent="game.opponent"
				:join="() => game.accept()"
				:ready="() => game.ready()"
				:random-player="() => game.addAiOpponent()"/>

		</div>

		<Select-theme />
	</div>
</template>

<script>
	import PlayerBattlefield from './playerbattlefield.vue';
	import OpponentBattlefield from './opponentbattlefield.vue';
	import InviteField from './invitefield.vue';
	import SummaryField from './summaryfield.vue';
	import Button from './button.vue';
	import GameMenu from './gamemenu.vue';
	import SelectTheme from './selecttheme.vue';
	import { getCellSize, toPx, collectionToArray, getClientWidth } from './utils.js';

	export default {
		components: {
			PlayerBattlefield,
			OpponentBattlefield,
			InviteField,
			SummaryField,
			SelectTheme,
			GameMenu,
			vButton: Button
		},

		data() {
			const game = this.$parent.game;

			return {
				game,
				clientWidth: getClientWidth(),
				playerShips: collectionToArray( game.player.battlefield.shipsCollection ),
				playerFields: collectionToArray( game.player.battlefield ),
				opponentShips: collectionToArray( game.opponent.battlefield.shipsCollection ),
				opponentFields: collectionToArray( game.opponent.battlefield ),
				size: game.player.battlefield.size,
				isPlayerActive: true,
				isOpponentActive: false,
				isShotEnabled: false
			};
		},

		computed: {
			cellSize() {
				return getCellSize( this.size, this.clientWidth );
			},

			width() {
				return toPx( ( this.cellSize * this.size ) * 2 + this.cellSize );
			},

			gameStateClass() {
				return 'status-' + this.game.status;
			}
		},

		mounted() {
			window.addEventListener( 'resize', () => ( this.clientWidth = getClientWidth() ) );

			// Observe game#activePlayer and toggle battlefield active state with a delay.
			// This is to improve the UX.
			const game = this.game;
			let changeTimeout = 0;

			this.game.on( 'change:activePlayerId', ( evt, name, value, prevValue ) => {
				this.isShotEnabled = false;
				clearTimeout( changeTimeout );
				changeTimeout = setTimeout( () => {
					this.isPlayerActive = !value || value === game.opponent.id;
					this.isOpponentActive = this.isShotEnabled = value === game.player.id;
				}, !prevValue ? 0 : 300 );
			} );
		},

		methods: {
			onSettingsChange( settings ) {
				this.$parent.onSettingsChange( settings );
			}
		}
	};
</script>

<style rel="stylesheet/postcss">
	.battleships {
		color: var( --battleships-font-color );
		font-family: var( --battleships-font-family );
		font-size: var( --battleships-font-size );
		background: var( --battleships-background-color );

		&, * {
			box-sizing: border-box;
		}

		.menu {
			display: flex;
			padding: 10px 0;

			& > .btn-wrapper {
				margin-right: 10px;
			}

			.to-right {
				display: flex;
				margin-left: auto;
			}
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
