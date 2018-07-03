<template>
	<div
		:style="{ width: dimension + 'px', height: dimension + 'px' }"
		class="field summary">

		<h2>You {{ isWinner ? 'won :)' : 'lost :(' }}</h2>

		<p v-if="opponent.isWaitingForRematch">Your opponent requested a rematch.</p>

		<v-Button
			:disabled="player.isWaitingForRematch"
			:execute="rematch">{{ opponent.isWaitingForRematch ? 'Rematch' : 'Request a rematch' }}</v-Button>

		<p class="new-game">
			<v-Button
				:disabled="player.isWaitingForRematch"
				:execute="newGame">Start new game</v-Button>
		</p>
	</div>
</template>

<script>
	import Field from './mixins/field.vue';
	import Button from './button.vue';
	import Player from 'battleships-core/src/player.js';

	export default {
		components: {
			'v-Button': Button
		},

		mixins: [ Field ],

		props: {
			player: {
				type: Player,
				default: () => {}
			},
			opponent: {
				type: Player,
				default: () => {}
			},
			isWinner: {
				type: Boolean,
				default: false
			},
			rematch: {
				type: Function,
				default: () => {}
			},
			newGame: {
				type: Function,
				default: () => {}
			}
		}
	};
</script>

<style rel="stylesheet/postcss">
	.summary {
		overflow: auto;

		.new-game {
			margin-top: 2em;
		}
	}
</style>
