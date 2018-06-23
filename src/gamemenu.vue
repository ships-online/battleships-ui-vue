<template>
	<div class="menu">
		<v-Button
			:disabled="game.player.isReady"
			:tooltip="game.player.isReady ? 'You have arranged your ships' : ''"
			:tooltip-position="'toLeft'"
			:execute="() => game.player.battlefield.random()">Randomize</v-Button>
		<v-Button
			:disabled="game.player.isReady || !game.player.isInGame || game.player.battlefield.isCollision"
			:tooltip="readyButtonTooltip"
			:execute="() => game.ready()">Ready</v-Button>

		<Settings
			:disabled="game.status !== 'available' || game.interestedPlayersNumber > 0 || game.player.isReady"
			:tooltip="settingsTooltip"
			:settings="game.player.battlefield.settings"
			:on-change="onSettingsChange"/>
	</div>
</template>

<script>
	import Game from 'battleships-core/src/game';

	import Settings from './settings.vue';
	import Button from './button.vue';

	export default {
		components: {
			Settings,
			vButton: Button
		},

		props: {
			game: {
				type: Game,
				default: () => {}
			},
			onSettingsChange: {
				type: Function,
				default: () => {}
			}
		},

		computed: {
			readyButtonTooltip() {
				if ( this.game.player.isReady ) {
					return 'You are ready';
				} else if ( !this.game.player.isInGame ) {
					return 'Join the game first';
				} else if ( this.game.player.battlefield.isCollision ) {
					return 'Ships configuration is invalid';
				}

				return '';
			},

			settingsTooltip() {
				if ( this.game.status !== 'available' ) {
					return 'Cannot change game settings<br>after the game has started';
				} else if ( this.game.player.isReady ) {
					return 'Cannot change game settings<br>when you are ready for the battle';
				} else if ( this.game.interestedPlayersNumber > 0 ) {
					return 'Cannot change game settings<br>while there are interested players';
				}

				return '';
			},
		}
	};
</script>

<style rel="stylesheet/postcss">
	.menu {
		display: flex;
		padding: 10px 0;

		& > .btn-wrapper {
			margin-right: 10px;
		}

		.settings {
			margin-left: auto;
		}
	}
</style>
