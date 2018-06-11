<template>
	<div>
		<h1>Battleships</h1>
		<h2>Game over</h2>

		<p v-if="error === 'not-exist'">Game does not exist.</p>
		<p v-else-if="error === 'not-available'">Game has already started.</p>
		<p v-else-if="error === 'host-left'">Your opponent has left the game.</p>
		<p v-else-if="error === 'opponent-left'">Your opponent has left the game.</p>
		<p v-else>{{ error }}</p>

		<v-Button :execute="newGame">Stat new game</v-Button>
	</div>
</template>

<script>
	import Button from './button.vue';

	export default {
		components: {
			'v-Button': Button
		},

		computed: {
			error() {
				return this.$parent.error.toString();
			}
		},

		methods: {
			newGame() {
				window.location.hash = '';
				window.location.reload();
			}
		}
	};
</script>
