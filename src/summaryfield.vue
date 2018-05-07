<template>
	<div
		:style="{ width: dimension + 'px', height: dimension + 'px' }"
		class="field summary">

		<h2>You {{ isWinner ? 'won' : 'lost' }}!</h2>

		<p v-if="opponent.isWaitingForRematch">Your opponent requested a rematch.</p>

		<button
			:disabled="player.isWaitingForRematch"
			@click="rematch">{{ opponent.isWaitingForRematch ? 'Rematch' : 'Request a rematch' }}</button>
	</div>
</template>

<script>
	import Field from './mixins/field.vue';
	import Player from 'battleships-core/src/player.js';

	export default {
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
			}
		},
	};
</script>
